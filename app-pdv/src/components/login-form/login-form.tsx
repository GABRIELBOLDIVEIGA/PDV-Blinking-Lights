import { useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useLoginForm } from "./useLoginForm";
import { Eye, EyeOff } from "lucide-react";
import { Loader } from "../loader/loader";

export const LoginForm = () => {
  const { form, onSubmit, isPending } = useLoginForm();
  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password"
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="usuario@email.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="flex items-center relative">
                  <Input
                    placeholder="**********"
                    type={showPassword}
                    {...field}
                  />

                  <div
                    onMouseOver={() => setShowPassword("text")}
                    onMouseOut={() => setShowPassword("password")}
                    className="right-2 opacity-30 hover:opacity-100 cursor-pointer absolute transition-all duration-500 ease-in-out"
                  >
                    {showPassword != "text" && <EyeOff size={18} />}
                    {showPassword === "text" && <Eye size={18} />}
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          <Loader isPending={isPending}>
            <p>Login</p>
          </Loader>
        </Button>
      </form>
    </Form>
  );
};
