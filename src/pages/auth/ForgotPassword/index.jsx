import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Row, Col, message } from "antd";
import apiServices from "../../../services/exportService";
import { useNavigate } from "react-router-dom";
import appImages from "../../../data/images";
import { CiMail, CiLock } from "react-icons/ci";
import { PublicURL } from "../../../DataConfig";
function ForgotPassword() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    values.url = PublicURL;

    setLoading(true);
    apiServices
      .post("User/forgot-password/", values)
      .then((data) => {
        console.log(data);
        message.success(
          "Success! We have successfully sent the password reset link to your email address."
        );
        navigate("/");
      })
      .catch((data) => {
        message.error(
          "Sorry, the email doesn't exist. Please reenter your email address."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-5/6"
            style={{
              backgroundImage: `url(${appImages.pageWise.login.loginBG})`,
            }}
          >
            <div className="flex items-center h-full px-10 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="flex text-2xl font-bold text-white sm:text-3xl">
                  Pezala - <p className="font-thin pl-2">Made for IOT</p>
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  IoT allows devices to exchange data with other devices and
                  systems over the internet.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto mb-20">
                  <img
                    className="w-auto h-[4rem]"
                    src={appImages.common.LogoWithTitle}
                    alt=""
                  />
                </div>
                <p className="text-2xl font-bold text-start text-gray-600">
                  Forgot Password?
                </p>
                <p className="mt-1 text-gray-500  text-start">
                  Enter the email address to reset your password.
                </p>
              </div>

              <div className="mt-8">
                <Form
                  name="forgotPass"
                  form={form}
                  onFinish={handleSubmit}
                  layout="vertical"
                >
                  <Form.Item
                    label="Email Address"
                    size="large"
                    prefix={<CiMail size={22} />}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="name@example.com" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="w-full mt-2"
                      htmlType="submit"
                      type="primary"
                      size="large"
                      loading={Loading}
                    >
                      Send Reset Instructions
                    </Button>
                  </Form.Item>
                </Form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Return to Sign In?{" "}
                  <a
                    onClick={() => {
                      navigate("/");
                    }}
                    className="text-primary cursor-pointer font-bold focus:outline-none focus:underline hover:underline"
                  >
                    Sign In
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
