import logo from "./logo.svg";
import "./App.css";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";

function App() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log(watch("email"));
  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    console.log("data >> ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label>Email</label>
      <input
        name="email"
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && <p>이메일을 입력해주세요</p>}
      <label>Name</label>
      <input name="name" {...register("name", { required: true })} />
      {errors.name && errors.name.type === "required" && (
        <p>이름을 입력해주세요</p>
      )}
      <label>Password</label>
      <input
        name="password"
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />
      {errors.password && errors.password.type === "required" && (
        <p>비밀번호를 입력해주세요</p>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <p>비밀번호는 최소 6글자 이상이어야 합니다</p>
      )}
      <label>Password Confirm</label>
      <input
        name="password_confirm"
        type="password"
        {...register("password_confirm", {
          required: true,
          validate: (value) => value === password.current,
        })}
      />
      {errors.password_confirm &&
        errors.password_confirm.type === "required" && (
          <p>비밀번호를 입력해주세요</p>
        )}
      {errors.password_confirm &&
        errors.password_confirm.type === "validate" && (
          <p>비밀번호가 다릅니다</p>
        )}

      <input type="submit" />
    </form>
  );
}

export default App;
