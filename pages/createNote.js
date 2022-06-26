import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const CreateNote = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await fetch("https://tobi-note-app.vercel.app/api/notes/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-20 bg-yellow-100 h-screen">
      <h1 className="text-center font-black md:text-xl lg:text-3xl xl:text-4xl uppercase">
        Create Note
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="flex flex-col my-5 font-bold items-center uppercase lg:w-screen">
            <input
              type="text"
              placeholder="Title"
              className="border-2 p-3 rounded-xl w-full md:w-72 lg:w-3/5 outline-stone-700"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div className="block flex flex-col justify-center items-center my-5 font-bold uppercase lg:w-screen">
            <textarea
            placeholder="Description"
              className="border-2 p-3 rounded-xl self-center w-full md:w-72 h-64 lg:w-3/5 outline-stone-700"
              {...register("description", { required: true })}
            />
            {errors.description && <span>This field is required</span>}
          </div>
          <div className="flex justify-center items-center my-5 font-bold uppercase lg:w-screen" >
            {loading ? 
            <button
            className="font-bold bg-stone-700 p-3 rounded-md hover:text-stone-700  lg:w-3/5 hover:bg-black uppercase items-center"
            type="submit"
          >
            Creating Note
          </button> : 
          
          <button
              className="font-bold bg-stone-700 p-3 rounded-md hover:text-stone-700  lg:w-3/5 hover:bg-black uppercase items-center"
              type="submit"
            >
              Create NOTE
            </button>
          }
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
