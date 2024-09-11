import React, { useState, Suspense, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, Spin, message } from "antd";
import apiServices from "../../../services/exportService";
import appImages from "../../../data/images";

function ResetPassword() {
  const [UIDdata, setUIDdata] = useState("");
  const [Tokendata, setTokdendata] = useState("");
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const [state, setState] = useState({
    values: null,
  });
  const handleSubmit = (values) => {
    let PostData = values;
    PostData["uid"] = UIDdata;
    PostData["token"] = Tokendata;
    apiServices
      .post("User/reset-password/", values)
      .then((data) => {
        console.log(data);
        message.success(data.message);
        navigate("/");
      })
      .catch((err) => {
        message.error("Token Invalid or Expired! Please try again.");
      });
  };
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let queryData1 = searchParams.get("uid");
    setUIDdata(queryData1);
    let queryData2 = searchParams.get("token");
    setTokdendata(queryData2);
    console.log(queryData1);
    console.log(queryData2);
    if (queryData1 === null && queryData2 === null) {
      navigate("/");
    }
  });

  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
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
                  Enter New Password
                </p>
                <p className="mt-1 text-gray-500  text-start">
                  Update your password
                </p>
              </div>

              <div className="mt-8">
                <Form
                  name="forgotPass"
                  onFinish={handleSubmit}
                  layout="vertical"
                >
                  <Form.Item
                    name="password"
                    label="Password"
                    style={{ width: "100%", marginTop: "1vh" }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder="Create new password"
                      size="large"
                      style={{ width: "100%" }}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm_password"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    style={{ width: "100%", marginTop: "1vh" }}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The new password that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm new password"
                      size="large"
                      style={{ width: "100%" }}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="w-full mt-2"
                      htmlType="submit"
                      type="primary"
                      size="large"
                    >
                      Change Password
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
    </Suspense>
  );
}

export default ResetPassword;
