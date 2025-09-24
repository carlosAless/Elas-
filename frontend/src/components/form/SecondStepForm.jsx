import { HiIdentification } from "react-icons/hi2";
import { useState, useEffect } from "react";
import {
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaCity,
  FaUserTag,
} from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const secondStepSchema = z.object({
  cpf_cnpj: z
    .string()
    .min(1, "CPF/CNPJ é obrigatório")
    .refine((value) => {
      // Validação básica de CPF/CNPJ
      const cleaned = value.replace(/\D/g, "");
      return cleaned.length === 11 || cleaned.length === 14;
    }, "CPF/CNPJ inválido"),
  type: z.string().min(1, "Tipo de perfil é obrigatório"),
  country: z.string().min(1, "País é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
});

export const SecondStepForm = ({ register, errors, watch, setValue }) => {
  const formValues = watch();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState({
    countries: false,
    states: false,
    cities: false,
  });

  // Definir valor padrão para type
  useEffect(() => {
    if (!formValues.type) {
      setValue("type", "Cidadão");
    }
  }, [formValues.type, setValue]);

  // Buscar países
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading((prev) => ({ ...prev, countries: true }));
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        const data = await response.json();

        const sortedCountries = data
          .map((country) => ({
            value: country.name.common,
            label: country.name.common,
            code: country.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Erro ao carregar países:", error);
      } finally {
        setLoading((prev) => ({ ...prev, countries: false }));
      }
    };

    fetchCountries();
  }, []);

  // Buscar estados quando país selecionado
  useEffect(() => {
    const fetchStates = async () => {
      if (!formValues.country) {
        setStates([]);
        setValue("state", "");
        return;
      }

      const countryCode = countries.find(
        (c) => c.value === formValues.country
      )?.code;

      if (countryCode === "BR") {
        setLoading((prev) => ({ ...prev, states: true }));
        try {
          const response = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
          );
          const data = await response.json();

          const sortedStates = data
            .map((state) => ({
              value: state.nome,
              label: state.nome,
              sigla: state.sigla,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

          setStates(sortedStates);
        } catch (error) {
          console.error("Erro ao carregar estados:", error);
        } finally {
          setLoading((prev) => ({ ...prev, states: false }));
        }
      } else {
        setLoading((prev) => ({ ...prev, states: true }));
        try {
          const response = await fetch(
            `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
            {
              headers: {
                "X-CSCAPI-KEY": "sua_chave_aqui",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const formattedStates = data
              .map((state) => ({
                value: state.name,
                label: state.name,
                iso2: state.iso2,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));

            setStates(formattedStates);
          } else {
            setStates([]);
          }
        } catch (error) {
          console.error("Erro ao carregar estados:", error);
          setStates([]);
        } finally {
          setLoading((prev) => ({ ...prev, states: false }));
        }
      }
    };

    if (countries.length > 0) {
      fetchStates();
    }
  }, [formValues.country, countries, setValue]);

  // Buscar cidades quando estado selecionado
  useEffect(() => {
    const fetchCities = async () => {
      if (!formValues.country || !formValues.state) {
        setCities([]);
        setValue("city", "");
        return;
      }

      const countryCode = countries.find(
        (c) => c.value === formValues.country
      )?.code;

      if (countryCode === "BR") {
        setLoading((prev) => ({ ...prev, cities: true }));
        try {
          const stateSigla = states.find(
            (s) => s.value === formValues.state
          )?.sigla;

          if (!stateSigla) return;

          const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSigla}/municipios`
          );
          const data = await response.json();

          const sortedCities = data
            .map((city) => ({
              value: city.nome,
              label: city.nome,
              id: city.id,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

          setCities(sortedCities);
        } catch (error) {
          console.error("Erro ao carregar cidades:", error);
        } finally {
          setLoading((prev) => ({ ...prev, cities: false }));
        }
      } else {
        setLoading((prev) => ({ ...prev, cities: true }));
        try {
          const stateIso = states.find(
            (s) => s.value === formValues.state
          )?.iso2;

          if (!stateIso) return;

          const response = await fetch(
            `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateIso}/cities`,
            {
              headers: {
                "X-CSCAPI-KEY": "sua_chave_aqui",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const formattedCities = data
              .map((city) => ({
                value: city.name,
                label: city.name,
                id: city.id,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));

            setCities(formattedCities);
          } else {
            setCities([]);
          }
        } catch (error) {
          console.error("Erro ao carregar cidades:", error);
          setCities([]);
        } finally {
          setLoading((prev) => ({ ...prev, cities: false }));
        }
      }
    };

    if (states.length > 0) {
      fetchCities();
    }
  }, [formValues.country, formValues.state, countries, states, setValue]);

  return (
    <>
      {/* Campo CPF/CNPJ */}
      <div className="inputGroup">
        <label htmlFor="cpf_cnpj">CPF ou CNPJ</label>
        <input
          type="text"
          id="cpf_cnpj"
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          className={errors.cpf_cnpj ? "error" : ""}
          {...register("cpf_cnpj")}
        />
        <span className="iconsInput">
          <HiIdentification />
        </span>
        {errors.cpf_cnpj && (
          <div className="error-message">{errors.cpf_cnpj.message}</div>
        )}
      </div>

      {/* Campo Tipo de Perfil */}
      <div className="">
        <div className="select-wrapper selectGroup">
          <label htmlFor="type">Seu perfil</label>
          <select
            id="type"
            className={errors.type ? "error" : ""}
            {...register("type")}
          >
            <option value="Gestor Público">Gestor Público</option>
            <option value="Moderador">Moderador</option>
            <option value="Organização não governamental">
              Organização não governamental
            </option>
            <option value="Cidadão">Cidadão</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        {errors.type && (
          <div className="error-message">{errors.type.message}</div>
        )}
      </div>

      {/* Campos de Localização */}
      <div className="inputGroup">
        <div className="select-wrapper selectGroup">
          <label htmlFor="country">País</label>
          <select
            id="country"
            className={errors.country ? "error" : ""}
            {...register("country", {
              onChange: (e) => {
                setValue("state", "");
                setValue("city", "");
              },
            })}
          >
            <option value="">Selecione um país</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
        {errors.country && (
          <div className="error-message">{errors.country.message}</div>
        )}
        {loading.countries && (
          <div className="loading">Carregando países...</div>
        )}
      </div>

      <div className="inputGroup">
        <div className="select-wrapper selectGroup">
          <label htmlFor="state">Estado</label>
          <select
            id="state"
            disabled={!formValues.country || loading.states}
            className={errors.state ? "error" : ""}
            {...register("state", {
              onChange: () => {
                setValue("city", "");
              },
            })}
          >
            <option value="">Selecione um estado</option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>
        {errors.state && (
          <div className="error-message">{errors.state.message}</div>
        )}
        {loading.states && <div className="loading">Carregando estados...</div>}
      </div>

      <div className="inputGroup">
        <div className="select-wrapper selectGroup">
          <label htmlFor="city">Cidade</label>
          <select
            id="city"
            disabled={!formValues.state || loading.cities}
            className={errors.city ? "error" : ""}
            {...register("city")}
          >
            <option value="">Selecione uma cidade</option>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>
        {errors.city && (
          <div className="error-message">{errors.city.message}</div>
        )}
        {loading.cities && <div className="loading">Carregando cidades...</div>}
      </div>

      <span className="lgpd-warning">
        🔒 Seus dados estão protegidos pela LGPD. Ao continuar, você concorda
        com nossa
        <strong> Política de Privacidade</strong> e
        <strong> Termos de Uso</strong>.
      </span>
    </>
  );
};
