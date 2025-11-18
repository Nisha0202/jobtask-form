"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";

type Field = {
  input: string;
  select: string;
};

export default function Form() {
  const [fields, setFields] = useState<Field[]>([{ input: "", select: "" }]);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (index: number, field: keyof Field, value: string) => {
    const updated = [...fields];
    updated[index][field] = value;
    setFields(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    fields.forEach((f, index) => {
      if (!f.input) newErrors[`input-${index}`] = "Input is required";
      if (!f.select) newErrors[`select-${index}`] = "Select is required";
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast.success("Form submitted successfully!");
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const addField = () => setFields([...fields, { input: "", select: "" }]);
  const deleteField = (index: number) => setFields(fields.filter((_, i) => i !== index));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-md border">
        {fields.map((f, i) => (
          <div key={i} className="flex flex-wrap md:flex-nowrap items-start gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={f.input}
                onChange={(e) => handleChange(i, "input", e.target.value)}
                placeholder="Type here"
                className="w-full  text-sm sm:text-base p-2 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-800 dark:text-white transition"
              />
              {errors[`input-${i}`] && <p className="text-red-500 text-sm mt-1">{errors[`input-${i}`]}</p>}
            </div>

            <div className="flex-1">
              <select
                value={f.select}
                onChange={(e) => handleChange(i, "select", e.target.value)}
                className="w-full  text-sm sm:text-base p-2 rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-800 dark:text-white transition"
              >
                <option value="">Select</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
              </select>
              {errors[`select-${i}`] && <p className="text-red-500 text-sm mt-1">{errors[`select-${i}`]}</p>}
            </div>

            <button
              type="button"
              onClick={() => deleteField(i)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2.5 rounded transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={addField}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            + Add Field
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Submit
          </button>
        </div>
      </form>

      <h3 className="mt-8 sm:mt-12 font-medium text-lg">Form State Table</h3>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border p-2 text-left">Input</th>
              <th className="border p-2 text-left">Select</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <tr key={i} className="even:bg-gray-50 dark:even:bg-gray-900">
                <td className="border  text-sm sm:text-base p-2">{f.input}</td>
                <td className="border  text-sm sm:text-base p-2">{f.select}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
