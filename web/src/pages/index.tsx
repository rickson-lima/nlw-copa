import Image from "next/image";
import appPreviewImg from "../assets/app-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarsExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
import { getCounts } from "../lib/load-counts";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolName, setPoolName] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/pools", {
        title: poolName,
      });

      const { code } = response.data;
      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso. O código foi copiado para a área de transferência!"
      );

      setPoolName("");
    } catch (error) {
      alert("Falha ao criar o bolão. Tente novamente!");
      console.log(error);
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto flex gap-24 items-center max-xl:px-6">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarsExampleImg} alt="Exemplo de avatar" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount} </span>
            pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            value={poolName}
            onChange={(event) => setPoolName(event.target.value)}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between grid-cols-2 text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Icone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount} </span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-[1px] bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Icone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount} </span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        className="max-lg:hidden"
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  );
}

export async function getStaticProps() {
  const counts = await getCounts();

  return {
    props: {
      ...counts,
    },
  };
}
