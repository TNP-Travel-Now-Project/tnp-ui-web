// "use client";

// import React from "react";
// import { Controller, Control, FieldValues, FieldError, Path } from "react-hook-form";
// import { Form } from "antd";
// import dynamic from "next/dynamic";

// const CKEditorComponent = dynamic(() => import("@/components/utils/CkEditor"), {
//   ssr: false,
//   loading: () => (
//     <div
//       style={{
//         height: "250px",
//         background: "#f5f5f5",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       Đang tải trình soạn thảo văn bản...
//     </div>
//   ),
// });

// export interface FormCKEditorProps<TFieldValues extends FieldValues = FieldValues> {
//   name: Path<TFieldValues>;
//   control: Control<TFieldValues>;
//   label?: React.ReactNode;
//   required?: boolean;
//   rules?: any;
//   error?: FieldError | undefined;
//   hint?: React.ReactNode;
//   description?: React.ReactNode;
//   editorProps?: any;
// }

// export const FormCKEditor = <TFieldValues extends FieldValues = FieldValues>({
//   name,
//   control,
//   label,
//   required,
//   rules,
//   error,
//   hint,
//   description,
//   editorProps,
// }: FormCKEditorProps<TFieldValues>) => {
//   return (
//     <Form.Item
//       label={label}
//       required={required}
//       help={error ? error.message : hint}
//       validateStatus={error ? "error" : undefined}
//       extra={description}
//     >
//       <Controller
//         control={control}
//         name={name}
//         rules={rules}
//         render={({ field }) => (
//           <CKEditorComponent
//             value={field.value || ""}
//             onChange={field.onChange}
//             minHeight="250px"
//             {...editorProps}
//           />
//         )}
//       />
//     </Form.Item>
//   );
// };

export default function FormCKEditor() {}
