import { supabase } from "../../src/helper/supabaseClient.js";

export const register = async (req, res) => {
  console.log("oi rota register" + req.body);

  try {
    const {
      name,
      email,
      tel,
      password,
      confirmpassword,
      cpf_cnpj,
      country,
      state,
      city, // Este é o ID da cidade
      type,
    } = req.body;

    console.log("Dados recebidos:", req.body);

    // 1. Validações básicas
    if (
      !name ||
      !email ||
      !tel ||
      !cpf_cnpj ||
      !password ||
      !confirmpassword ||
      !country ||
      !state ||
      !city ||
      !type
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "As senhas não coincidem." });
    }

    // 2. Verifica se o e-mail ou CPF/CNPJ já existe
    const { data: personExists, error: personExistsError } = await supabase
      .from("person")
      .select("id")
      .or(`email.eq.${email},cnpj_cpf.eq.${cpf_cnpj}`)
      .maybeSingle();

    if (personExistsError) throw personExistsError;

    if (personExists) {
      return res
        .status(400)
        .json({ error: "Usuário já cadastrado com este e-mail ou CPF/CNPJ." });
    }

    // 3. Registrar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          user_type: "person",
        },
      },
    });

    if (authError) {
      console.error("Erro no auth:", authError);
      return res.status(400).json({
        error: "Erro no registro",
        details: authError.message,
      });
    }

    // 4. Inserir a pessoa na tabela person
    const { data: newCountry, error: countryError } = await supabase
      .from("country")
      .insert([{ name: country }])
      .select("id")
      .single();
    if (countryError) throw countryError;
    const countryId = newCountry.id;

    // 1.2 Criar estado (sempre insere)
    const { data: newState, error: stateError } = await supabase
      .from("state")
      .insert([{ name: state, country_id: countryId }])
      .select("id")
      .single();
    if (stateError) throw stateError;
    const stateId = newState.id;

    // 1.3 Criar cidade (sempre insere)
    const { data: newCity, error: cityError } = await supabase
      .from("city")
      .insert([{ name: city, state_id: stateId }])
      .select("id")
      .single();
    if (cityError) throw cityError;
    const cityId = newCity.id;

    // =====================
    // 2. CADASTRAR A PERSON
    // =====================
    const { data: personData, error: insertPersonError } = await supabase
      .from("person")
      .insert([
        {
          name,
          email,
          phone: tel,
          cnpj_cpf: cpf_cnpj,
          category: type,
        },
      ])
      .select("id")
      .single();

    if (insertPersonError) throw insertPersonError;
    const personId = personData.id;

    // =====================
    // 3. VINCULAR PERSON + CITY
    // =====================
    const { error: insertLocationError } = await supabase
      .from("person_location")
      .insert([
        {
          person_id: personId,
          city_id: cityId,
        },
      ]);

    if (insertLocationError) throw insertLocationError;
    // 6. Resposta final
    return res.status(201).json({
      message: "Usuário registrado com sucesso!",
      person: {
        id: personId,
        name,
        email,
        phone: tel,
        cpf_cnpj: cpf_cnpj,
        category: type,
      },
      requiresVerification:
        !!authData.user?.identities?.[0]?.identity_data?.email_verified,
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "E-mail e senha são obrigatórios." });
    }

    // Fazer login no Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        error: "Credenciais inválidas",
        details: error.message,
      });
    }

    // Buscar dados da pessoa com endereço completo (ATUALIZADO)
    const { data: personData, error: personError } = await supabase
      .from("person")
      .select(
        `
        *,
        person_location (
          *,
          city (
            name,
            state (
              name,
              country (
                name
              )
            )
          )
        )
      `
      )
      .eq("email", email)
      .single();

    if (personError || !personData) {
      return res.status(400).json({ error: "Perfil não encontrado" });
    }

    // Verificar status da conta
    if (personData.status !== "ativa") {
      return res.status(403).json({
        error: "Conta em análise ou desativada",
        status: personData.status,
      });
    }

    return res.json({
      message: "Login realizado com sucesso!",
      user: personData,
      session: data.session,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};
