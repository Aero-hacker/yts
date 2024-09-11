export const apiEndpoints = {
  auth: {
    login: "User/login/",
    profile: "User/profile/",
  },
  home: {
    projects: {
      read: "staff/Get-ProjectByStudent/",
      readByMember: "staff/Get-ProjectBymember/",
      configuration: "STUDENT/Update-ProjectConfiguration/",
      getConfiguration: "STUDENT/Get-ProjectConfiguration/",
      TeamDetails: "staff/Get-TeamDetailsbyTEAMID/",
      GetTeamDetailsByInstitute : "staff/Get-TeamDetailsByInstitute/" 
    },
    initialProcess: {
      projectPlanning: {
        get: "STUDENT/Get-projectplanning/",
        create: "STUDENT/Create-projectplanning/",
        update: "STUDENT/Update-projectplanning/",
      },
      blockDiagram: {
        get: "STUDENT/Get-BlocKDiagram/",
        create: "STUDENT/Create-BlocKDiagram/",
        update: "STUDENT/Update-BlocKDiagram/",
      },
      bom: {
        createRequest: "mrp/get-project-configuration/",
        getBomRequest: "mrp/get-project-configuration/",
        creatBom: "mrp/create-bom/",
        getBom: "mrp/get-bom/",
        createProduct: "mrp/add-bom-product/",
        getProduct: "mrp/get-bom-product/",
        submitBOM: "mrp/submit-bom-for-approval/",
      },
    },
  },
  ProjectPlanning: {
    GET: "STUDENT/Get-projectplanningjson/",
    CREATE: "STUDENT/Create-projectplanningjson/",
    UPDATE: "STUDENT/Update-projectplanningjson/",
  },
  BlockDiagram: {
    GET: "STUDENT/Get-BlocKDiagramjson/",
    CREATE: "STUDENT/Create-BlocKDiagramjson/",
    UPDATE: "STUDENT/Update-BlocKDiagramjson/",
  },
  inventory: {
    addItem: "inventory/add-hardware-project/",
    readhardware: "hardware/get-hardware-listing/",
    readinventoryHardware: "inventory/get-hardware-project-list/",
    getHardwareSerial: "inventory/get-hardware-serial/",
    deleteHardwareSerial: "inventory/delete-hardware-serial/",
    deleteHardware: "inventory/delete-hardware/",
  },
  Configuration: {
    CompleteData: "IOTconfiguration/Get-EquipmentHierarchial/",
    FormData: {
      HardwareList: "IOTconfiguration/Get-hardwarelist/",
    },
    ChipBoard: {
      Create: "IOTconfiguration/Create-ChipBoardDetails/",
      Edit: "IOTconfiguration/Update-ChipBoardDetails/",
      Get: "IOTconfiguration/Get-ChipBoardDetails/",
      Delete: "IOTconfiguration/Delete-ChipBoardDetails/",
    },
    Component: {
      Create: "IOTconfiguration/Create-ComponentDetails/",
      Edit: "IOTconfiguration/Update-ComponentDetails/",
      Get: "IOTconfiguration/Get-ComponentDetails/",
      Delete: "IOTconfiguration/Delete-ComponentDetails/",
    },
    Equipment: {
      Create: "IOTconfiguration/Create-EquipmentDetails/",
      Edit: "IOTconfiguration/Update-EquipmentDetails/",
      Get: "IOTconfiguration/Get-EquipmentDetailslist/",
      Delete: "IOTconfiguration/Delete-EquipmentDetails/",
    },
  },
  AppEditor: {
    SaveJson: "STUDENT/Create-jsondata/",
    GetJson: "STUDENT/Get-jsondataequipment/",
  },
  CodePush: {
    GenerateBinFile: "STUDENT/Create-backend_generatedcode/",
    GetJSON: "STUDENT/Get-jsondataproject/",
    UpdateJSON: "STUDENT/Update-jsondatabackend/",
  },
  ticket: {
    create: "https://dadminapi.pezala.in/api/ticketraise/Create-Ticket/",
  },
  ProjectCompletion: {
    GetByProject: "STUDENT/Get-projectcompletion/",
    Create: "STUDENT/Create-projectcompletion/",
    Update: "STUDENT/Update-projectcompletion/",
    GetCertificate: "STUDENT/generate-certificate/",
  },
};
