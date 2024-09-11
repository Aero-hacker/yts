import { useNavigate } from "react-router-dom";
import { CiMail, CiLock } from "react-icons/ci";
import appImages from "../../../data/images";
import { Button, Form, Input, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import {
  setPosition,
  setStudentId,
  setUserId,
  storeRefreshToken,
  storeToken,
  setSectionId,
  setPCRStatus,
  getPCRStatus,
  setStudentType,
  setInstituteId,
} from "../../../services/localServices";

const LoginPage = () => {
  const navigate = useNavigate();
  const { form } = useForm();
  const [loading, setLoading] = useState(false);

  // Functions
  const handleLogin = (values) => {
    setLoading(true);
    apiServices
      .post(apiEndpoints.auth.login, values)
      .then((res) => {
        let PasswordFetch = values["password"];
        let PasswordSplit = PasswordFetch.split("_");
        if (`${PasswordSplit[0]}` === "STP") {
          setPCRStatus("true");
        } else {
          setPCRStatus("false");
        }
        onLoginSuccess(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const onLoginSuccess = (e) => {
    storeToken(e.token.access);
    storeRefreshToken(e.token.refresh);
    setPosition(e.Position);
    setStudentId(e.STUDID ? e.STUDID : e.member_id);
    setStudentType(e.STUDID ? "STUDENT" : "ESTUDENT");
    setUserId(e.id);
    setInstituteId(e.Institute_ID);
    setSectionId(e.Sec_ID);
    navigate("/dashboard/projects");
  };

  return (
    <>
      <div className="bg-whit">
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
                  Login
                </p>
                <p className="mt-1 text-gray-500  text-start">
                  Access your account now.
                </p>
              </div>

              <div className="mt-8">
                <Form form={form} layout="vertical" onFinish={handleLogin}>
                  <Form.Item label={"Email"} name="email">
                    <Input
                      name="email"
                      type="email"
                      size="large"
                      placeholder="Enter your email"
                      prefix={<CiMail size={22} />}
                    />
                  </Form.Item>
                  <Form.Item label={"Password"} name="password">
                    <Input
                      type="password"
                      size="large"
                      prefix={<CiLock size={22} />}
                    />
                  </Form.Item>
                  <p
                    className="my-2 text-sm text-center text-gray-400 mr-4"
                    style={{ float: "right" }}
                  >
                    <a
                      onClick={() => {
                        navigate("/forgotPassword");
                      }}
                      className="text-primary cursor-pointer font-bold focus:outline-none focus:underline hover:underline"
                    >
                      Forgot Password ?
                    </a>
                  </p>
                  <Button
                    loading={loading}
                    className="w-full"
                    htmlType="submit"
                    size="large"
                    type="primary"
                  >
                    Login
                  </Button>
                </Form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <a
                    onClick={() => message.info("This feature is coming soon")}
                    className="text-primary cursor-pointer font-bold focus:outline-none focus:underline hover:underline"
                  >
                    Register
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
};

export default LoginPage;
