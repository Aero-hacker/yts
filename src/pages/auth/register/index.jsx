import { useNavigate } from "react-router-dom";
import BasicInput from "../../../components/common/inputFields/basicInput";

//Icons
import { CiMail, CiLock } from "react-icons/ci";
import BasicButton from "../../../components/common/buttons/basicButton";
import appImages from "../../../data/images";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: `url(${appImages.pageWise.register.registerBG})`,
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
                  Register
                </p>
                <p className="mt-1 text-gray-500 text-start">
                  Create a new account to have access.
                </p>
              </div>

              <div className="mt-8">
                <form>
                  <div className="grid gap-y-4">
                    <div>
                      <label className="block text-sm mb-2">
                        Email address
                      </label>
                      <div className="relative">
                        <BasicInput
                          name={"email"}
                          type={"email"}
                          placeholder={"Enter your email address"}
                          icon={CiMail}
                        />
                      </div>
                    </div>

                    <div className="mb-4 ">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm mb-2">
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <BasicInput
                          name={"password"}
                          type={"password"}
                          placeholder={"Enter password"}
                          icon={CiLock}
                        />
                      </div>
                    </div>

                    <BasicButton type={"submit"}>
                      Create a new account
                    </BasicButton>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <a
                    onClick={() => navigate("/login")}
                    className="text-primary focus:outline-none focus:underline hover:underline"
                  >
                    Login
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
