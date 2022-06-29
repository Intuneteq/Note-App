import fetch from 'isomorphic-unfetch';

import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const EditNote = ({note}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: note.title,
      description: note.description
    }
  });

  const onSubmit = async (data) => {
    try {
      const noteID = router.query.id;

      const res = await fetch(`https://tobi-note-app.vercel.app/api/notes/${noteID}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "access-control-allow-origin": "*"
        },
        body: JSON.stringify(data)
      }) 
      router.push("/");
    } catch (error) {
      
    }
  };

  return (
    <div className="pt-20 bg-yellow-100 h-screen">
      <h1 className="text-center font-black md:text-xl lg:text-3xl xl:text-4xl uppercase">
        EDIT NOTE
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="flex flex-col my-5 font-bold items-center uppercase lg:w-screen">
            {/* <label htmlFor="title">Title:</label> */}
            <input
              type="text"
              placeholder="Title"
              className="border-2 p-3 rounded-xl w-full md:w-72 lg:w-3/5 outline-stone-700"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div className="block flex flex-col justify-center items-center my-5 font-bold uppercase lg:w-screen">
            {/* <label htmlFor="description">Description:</label> */}
            <textarea
            placeholder="Description"
              className="border-2 p-3 rounded-xl self-center w-full md:w-72 h-64 lg:w-3/5 outline-stone-700"
              {...register("description", { required: true })}
            />
            {errors.description && <span>This field is required</span>}
          </div>
          <div className="flex justify-center items-center my-5 font-bold uppercase lg:w-screen">
            <button
              className="font-bold bg-stone-700 p-3 rounded-md hover:text-stone-700  lg:w-3/5 hover:bg-black uppercase items-center"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditNote.getInitialProps = async ({query: {id} }) => {
  const res = await fetch(`https://tobi-note-app.vercel.app/api/notes/${id}`);
  const { data } = await res.json();

  return {note: data}
}


export default EditNote;
