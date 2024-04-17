import { AbstractProvider, Contract, JsonRpcSigner, ethers } from "ethers";
const provider = new ethers.JsonRpcProvider("https://rpc2.sepolia.org");

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
export const ConcordiaAbi = [
  "function show_project_info(string calldata _project_name) view",
];

export const ConcordiaAbi1 = [
  "function closeProject(string calldata _project_name, CloseReason reason, string calldata description)",
  "function editAccount(address account_id, string calldata nickname, string calldata profile_image, string calldata bio, SocialLink[] calldata social_links) returns (Account memory)",
  "function editProject(string calldata project_name,string calldata project_image,string[] memory project_detail_images,Want calldata wanted_jobs,string calldata description,Field[] memory fields) returns (Project memory)",
  "function reject_application(string calldata _project_name, address account_id)",
  "function accept_application(string calldata _project_name, address account_id)",
  "function apply_for_project(string calldata project_name)",
  "function create_account(string calldata nickname,string calldata image_url,SocialLink[] calldata links,string calldata bio,Job job)",
  "function create_project(string calldata project_name,string calldata project_image,string[] calldata project_detail_images, Want calldata wanted_jobs, string calldata description, Field[] calldata fields) returns (Project memory)",
  "function show_project_info(string calldata _project_name) view returns (Project memory)",
];
const concordiaContract = new Contract(
  "0x27E98E87C9f8CB05EbaC1f2E92c666d102A73aba",
  ConcordiaAbi,
  provider,
);

export async function show_project_info(project_name: String) {
  try {
    let result = await concordiaContract.show_project_info(project_name);
    return result;
  } catch (err) {
    console.log(err);
    return "";
  }
}

async function show_account_info(account_id: String) {
  try {
    let result = await concordiaContract.show_account_info(account_id);
    return result;
  } catch (err) {
    console.log(err);
    return "";
  }
}

async function get_projects() {
  try {
    let result; // = await concordiaContract.show_account_info(account_id);
    return result;
  } catch (err) {
    return "";
  }
}

async function create_project(signer: JsonRpcSigner) {
  try {
    let result = await concordiaContract.show_account_info(account_id);
    return result;
  } catch (err) {
    return "";
  }
}

async function create_account(signer: JsonRpcSigner) {}

async function apply_for_project(signer: JsonRpcSigner) {}

async function closeProject(signer: JsonRpcSigner) {}

async function editAccount(signer: JsonRpcSigner) {}

async function editProject(signer: JsonRpcSigner) {}

async function reject_application(signer: JsonRpcSigner) {}

async function accept_application(signer: JsonRpcSigner) {}
