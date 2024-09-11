export const isLoggedIn = () => {
  return localStorage.getItem("access");
};

export const setLoggedIn = (value) => {
  localStorage.setItem("access", value);
};

export const handleLogout = () => {
  localStorage.clear();
};

export const storeToken = (token) => {
  localStorage.setItem("access", token);
};
export const storeRefreshToken = (token) => {
  localStorage.setItem("refresh", token);
};

export const readToken = () => {
  return localStorage.getItem("access");
};

export const readRefreshToken = () => {
  return localStorage.getItem("refresh");
};

export const setPosition = (role) => {
  localStorage.setItem("Position", role);
};

export const readPosition = () => {
  return localStorage.getItem("Position");
};

export const setStaffID = (role) => {
  localStorage.setItem("Position", role);
};

export const readStaffID = () => {
  return localStorage.getItem("Position");
};

export const setUserId = (role) => {
  localStorage.setItem("id", role);
};

export const readUserId = () => {
  return localStorage.getItem("id");
};

export const setStudentId = (id) => {
  localStorage.setItem("STUDID", id);
};

export const readStudentId = () => {
  return localStorage.getItem("STUDID");
};

export const setStudentType = (id) => {
  localStorage.setItem("StudentType", id);
};

export const readStudentType = () => {
  return localStorage.getItem("StudentType");
};

export const setSectionId = (id) => {
  localStorage.setItem("SecID", id);
};

export const readSectionId = () => {
  return localStorage.getItem("SecID");
};

export const setProjectsList = (data) => {
  localStorage.setItem("projects", JSON.stringify(data));
};

export const readProjectsList = () => {
  return JSON.parse(localStorage.getItem("projects"));
};

export const setSelectedProjectId = (data) => {
  localStorage.setItem("selected_project_id", data);
};

export const readSelectedProjectId = () => {
  return localStorage.getItem("selected_project_id");
};

export const setPCRStatus = (data) => {
  localStorage.setItem("PCR", data);
};

export const getPCRStatus = () => {
  return localStorage.getItem("PCR") === "true" ? true : false;
};

export const setInstituteId = (data) => {
  localStorage.setItem("institute_id", data);
};
export const getInstituteId = () => {
  return localStorage.getItem("institute_id");
};
