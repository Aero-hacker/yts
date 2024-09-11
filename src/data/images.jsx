import LogoWithTitle from "../assets/PezalaWithTitle.png";
import Logo from "../assets/Pezala.png";

// login page
import loginBG from "../assets/images/loginBG.jpg";

// Register Page
import registerBG from "../assets/images/registerBG.jpg";

// Projects Page
import projectImage from "../assets/images/projectBanner.jpg";

// Initial process
import underreview from "../assets/icons/initialProcess/documents.png";

// For Editor
import DataSheet from "../assets/images/SheetView.svg";

const appImages = {
  common: {
    icon: {},
    LogoWithTitle,
    Logo,
  },
  pageWise: {
    login: {
      loginBG,
    },
    register: {
      registerBG,
    },
    projects: {
      projectImage,
    },
    initialProcess: {
      underreview,
    },
    appEditor: {
      DataSheet,
    },
  },
};

export default appImages;
