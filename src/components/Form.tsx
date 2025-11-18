"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Field = {
  input: string;
  select: string;
};

export default function Form() {
  const [fields, setFields] = useState<Field[]>([
    { input: "", select: "" },
  ]);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    index: number,
    field: keyof Field,
    value: string
  ) => {
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

  const addField = () => {
    setFields([...fields, { input: "", select: "" }]);
  };

  const deleteField = (index: number) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div>
              <input
                type="text"
                value={f.input}
                onChange={(e) =>
                  handleChange(i, "input", e.target.value)
                }
                className="border p-2 rounded w-40"
                placeholder="Type here"
              />
              {errors[`input-${i}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`input-${i}`]}
                </p>
              )}
            </div>

            <div>
              <select
                value={f.select}
                onChange={(e) =>
                  handleChange(i, "select", e.target.value)
                }
                className="border p-2 rounded w-32"
              >
                <option value="" className="bg-gray-200 text-gray-800">Select</option>
                <option value="One" className="bg-gray-200 text-gray-800">One</option>
                <option value="Two" className="bg-gray-200 text-gray-800">Two</option>
              </select>
              {errors[`select-${i}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`select-${i}`]}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => deleteField(i)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          +
        </button>

        <button
          type="submit"
          className="block bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {/* Print form state */}
      <h3 className="mt-6 font-semibold text-lg">Form State (Table)</h3>

      <table className="border mt-2 w-full">
        <thead>
          <tr className="border">
            <th className="border p-2">Input</th>
            <th className="border p-2">Select</th>
          </tr>
        </thead>

        <tbody>
          {fields.map((f, i) => (
            <tr key={i} className="border">
              <td className="border p-2">{f.input}</td>
              <td className="border p-2">{f.select}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
