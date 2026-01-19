// Register.jsx
import "../auth.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FirstStepForm } from "../../../components/form/FirstStepForm";
import {
  FirstStepFormSchema,
  SecondStepFormSchema,
} from "../../../components/schemas/Schema";
import { useHook } from "../../../hooks/useForm";
import { SecondStepForm } from "../../../components/form/SecondStepForm";
import { useNavigate, Link } from "react-router-dom"; // Importe useNavigate e Link
import { images } from "../../../assets/assets";

export const Register = () => {
  const navigate = useNavigate(); // Hook para navegação programática

  const firstStepForm = useForm({
    resolver: zodResolver(FirstStepFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const secondStepForm = useForm({
    resolver: zodResolver(SecondStepFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { currentStep, changeStep, currentComponent } = useHook([
    <FirstStepForm
      key={0}
      register={firstStepForm.register}
      errors={firstStepForm.formState.errors}
    />,
    <SecondStepForm
      key={1}
      register={secondStepForm.register}
      errors={secondStepForm.formState.errors}
      watch={secondStepForm.watch}
      setValue={secondStepForm.setValue}
    />,
  ]);

  const handleNext = async () => {
    const isValid = await firstStepForm.trigger([
      "name",
      "email",
      "tel",
      "password",
      "confirmpassword",
    ]);
    if (isValid) {
      changeStep(currentStep + 1);
    }
  };

  const onSubmit = async (data) => {
    const isSecondValid = await secondStepForm.trigger();
    if (isSecondValid) {
      const completeData = {
        ...firstStepForm.getValues(),
        ...data,
      };
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(completeData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert("Conta criada com sucesso!");
          // Use navigate em vez de window.location.href
          navigate("/login");
        } else {
          alert(result.message || "Erro ao criar conta");
          console.error(result.errors);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao conectar com o servidor.");
      }
    }
  };

  return (
    <div className="">
      <div className="auth-container">
        <div className="auth-left-panel">
          <img
            src={images.mulheres}
            alt="ElasPorElas - Ilustração"
            className="auth-image-left"
          />
        </div>

        <div className="rounded-[var(--border-standard)]">
          <form id="formRegister" className="auth-form">
            <div className="form-title">
              <img
                src={images.elasporelas}
                alt="ElasPorElas - Ilustração"
                className="w-50"
              />
            </div>

            <span className="form-subtitle">
              Crie sua conta para começar a fazer a diferença
            </span>

            <div className="progress-indicator">
              Passo {currentStep + 1} de 2
            </div>

            {currentComponent}

            <div className="form-controls">
              <input
                id="btnControl"
                type="button"
                value="Voltar"
                onClick={() => changeStep(currentStep - 1)}
                disabled={currentStep === 0}
                className="btn-secondary"
              />

              {currentStep === 1 ? (
                <input
                  className="btn-primary"
                  type="button"
                  value="Finalizar"
                  onClick={secondStepForm.handleSubmit(onSubmit)}
                />
              ) : (
                <input
                  className="btn-primary"
                  type="button"
                  value="Avançar"
                  onClick={handleNext}
                />
              )}
            </div>

            <span className="form-footer">
              Já possui uma conta?{" "}
              <Link to="/login" className="auth-link">
                <strong>Faça login</strong>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
