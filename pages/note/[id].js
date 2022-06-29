import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Oval } from "react-loader-spinner";

const IndividualNote = ({ data }) => {
  console.log("individual", data);

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://tobi-note-app.vercel.app/api/notes/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = res.json();
      console.log('show', data);
      setIsDeleting(true);
      console.log("RESPONSE", data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-20 px-5 pb-20 bg-yellow-100 h-fit min-h-screen relative">
      {isDeleting ? <Oval color="#00BFFF" height={80} width={80} /> : ""}
      <h1 className="text-center mb-5 uppercase font-black md:text-xl lg:text-3xl xl:text-4xl">
        {data.title}
      </h1>
      <p className="font-medium text-justify mb-8">{data.description}</p>
      <div className="absolute inset-x-1/4 bottom-11 flex justify-center gap-5">
        <button
          className="font-bold bg-stone-700 p-3 rounded-md hover:text-stone-700 hover:bg-black"
          onClick={() =>handleDelete(data._id)}
        >
          DELETE
        </button>
        <Link href={`/${data._id}/updateblog`}>
          <a className="font-bold bg-stone-700 p-3 rounded-md hover:text-stone-700 hover:bg-black">
            EDIT
          </a>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const res = await fetch(`https://tobi-note-app.vercel.app/api/notes/${id}`);
  const { data } = await res.json();

  return {
    props: { data },
  };
};

export default IndividualNote;
