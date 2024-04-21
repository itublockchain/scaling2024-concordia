import {
  AbstractProvider,
  Contract,
  JsonRpcSigner,
  ethers,
  isError,
} from "ethers";
const provider = new ethers.JsonRpcProvider(
  "https://sepolia-rollup.arbitrum.io/rpc",
);

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
// export const ConcordiaAbi = [
//   "function show_project_info(string calldata _project_name) view",
//   "function create_project(string calldata project_name, string calldata project_image, string[] calldata project_detail_images, tuple(bool reseacher ,bool designer ,bool developer, bool investor) calldata wanted_jobs, string calldata description, uint8[] calldata fields)",
//   "function editProject(string calldata project_name,string calldata project_image,string[] memory project_detail_images,tuple(bool reseacher ,bool designer ,bool developer, bool investor) calldata wanted_jobs,string calldata description,uint8[] memory fields)",
//   "function create_account(string calldata nickname,string calldata image_url,tuple(string name,string url)[] calldata links,string calldata bio,uint8 job)",
//   "function show_project_info(string calldata _project_name) view returns (tuple(string,address,string,string[],address[],address[],tuple(bool,bool,bool,bool),string,tuple(uint8,string),uint8[]) projects)",
//   "function closeProject(string calldata _project_name, uint8 reason, string calldata description)",
//   "function projects(uint256) view",
// ];

export interface CreateProjectInterface {
  project_name: string;
  project_image: string;
  project_detail_images: string[];
  wanted_jobs: Want;
  description: string;
  fields: number[];
}

export interface EditProjectInterface {
  project_name: string;
  project_image: string;
  project_detail_images: string[];
  wanted_jobs: Want;
  description: string;
  fields: number[];
}

export interface Want {
  reseacher: boolean;
  designer: boolean;
  developer: boolean;
  investor: boolean;
}

//string calldata nickname,string calldata image_url,SocialLink[] calldata links,string calldata bio,Job job

export interface CreateAccountInterface {
  nickname: string;
  image_url: string;
  links: SocialLink[];
  bio: string;
  job: number;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface CloseProjectInterface {
  project_name: string;
  reason: number;
  description: string;
}

export const ConcordiaAbi = `[{"inputs":[{"internalType":"string","name":"_project_name","type":"string"},{"internalType":"address","name":"account_id","type":"address"}],"name":"accept_application","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"accountmap","outputs":[{"internalType":"address","name":"account_id","type":"address"},{"internalType":"string","name":"nickname","type":"string"},{"internalType":"string","name":"profile_image","type":"string"},{"internalType":"string","name":"bio","type":"string"},{"internalType":"enum FindTeam.Job","name":"job","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"project_name","type":"string"}],"name":"apply_for_project","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_project_name","type":"string"},{"internalType":"enum FindTeam.CloseReason","name":"reason","type":"uint8"},{"internalType":"string","name":"description","type":"string"}],"name":"closeProject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"nickname","type":"string"},{"internalType":"string","name":"image_url","type":"string"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"url","type":"string"}],"internalType":"struct FindTeam.SocialLink[]","name":"links","type":"tuple[]"},{"internalType":"string","name":"bio","type":"string"},{"internalType":"enum FindTeam.Job","name":"job","type":"uint8"}],"name":"create_account","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"project_name","type":"string"},{"internalType":"string","name":"project_image","type":"string"},{"internalType":"string[]","name":"project_detail_images","type":"string[]"},{"components":[{"internalType":"bool","name":"reseacher","type":"bool"},{"internalType":"bool","name":"designer","type":"bool"},{"internalType":"bool","name":"developer","type":"bool"},{"internalType":"bool","name":"investor","type":"bool"}],"internalType":"struct FindTeam.Want","name":"wanted_jobs","type":"tuple"},{"internalType":"string","name":"description","type":"string"},{"internalType":"enum FindTeam.Field[]","name":"fields","type":"uint8[]"}],"name":"create_project","outputs":[{"components":[{"internalType":"string","name":"project_name","type":"string"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"project_image","type":"string"},{"internalType":"string[]","name":"project_detail_images","type":"string[]"},{"internalType":"address[]","name":"team_members","type":"address[]"},{"internalType":"address[]","name":"appliers","type":"address[]"},{"components":[{"internalType":"bool","name":"reseacher","type":"bool"},{"internalType":"bool","name":"designer","type":"bool"},{"internalType":"bool","name":"developer","type":"bool"},{"internalType":"bool","name":"investor","type":"bool"}],"internalType":"struct FindTeam.Want","name":"wanted_jobs","type":"tuple"},{"internalType":"string","name":"description","type":"string"},{"components":[{"internalType":"enum FindTeam.CloseReason","name":"reason","type":"uint8"},{"internalType":"string","name":"close_description","type":"string"}],"internalType":"struct FindTeam.CloseDetail","name":"close_detail","type":"tuple"},{"internalType":"enum FindTeam.Field[]","name":"fields","type":"uint8[]"}],"internalType":"struct FindTeam.Project","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account_id","type":"address"},{"internalType":"string","name":"nickname","type":"string"},{"internalType":"string","name":"profile_image","type":"string"},{"internalType":"string","name":"bio","type":"string"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"url","type":"string"}],"internalType":"struct FindTeam.SocialLink[]","name":"social_links","type":"tuple[]"}],"name":"editAccount","outputs":[{"components":[{"internalType":"address","name":"account_id","type":"address"},{"internalType":"string","name":"nickname","type":"string"},{"internalType":"string","name":"profile_image","type":"string"},{"internalType":"string","name":"bio","type":"string"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"url","type":"string"}],"internalType":"struct FindTeam.SocialLink[]","name":"social_links","type":"tuple[]"},{"internalType":"string[]","name":"created_project_ids","type":"string[]"},{"internalType":"string[]","name":"joined_project_ids","type":"string[]"},{"internalType":"enum FindTeam.Job","name":"job","type":"uint8"}],"internalType":"struct FindTeam.Account","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"project_name","type":"string"},{"internalType":"string","name":"project_image","type":"string"},{"internalType":"string[]","name":"project_detail_images","type":"string[]"},{"components":[{"internalType":"bool","name":"reseacher","type":"bool"},{"internalType":"bool","name":"designer","type":"bool"},{"internalType":"bool","name":"developer","type":"bool"},{"internalType":"bool","name":"investor","type":"bool"}],"internalType":"struct FindTeam.Want","name":"wanted_jobs","type":"tuple"},{"internalType":"string","name":"description","type":"string"},{"internalType":"enum FindTeam.Field[]","name":"fields","type":"uint8[]"}],"name":"editProject","outputs":[{"components":[{"internalType":"string","name":"project_name","type":"string"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"project_image","type":"string"},{"internalType":"string[]","name":"project_detail_images","type":"string[]"},{"internalType":"address[]","name":"team_members","type":"address[]"},{"internalType":"address[]","name":"appliers","type":"address[]"},{"components":[{"internalType":"bool","name":"reseacher","type":"bool"},{"internalType":"bool","name":"designer","type":"bool"},{"internalType":"bool","name":"developer","type":"bool"},{"internalType":"bool","name":"investor","type":"bool"}],"internalType":"struct FindTeam.Want","name":"wanted_jobs","type":"tuple"},{"internalType":"string","name":"description","type":"string"},{"components":[{"internalType":"enum FindTeam.CloseReason","name":"reason","type":"uint8"},{"internalType":"string","name":"close_description","type":"string"}],"internalType":"struct FindTeam.CloseDetail","name":"close_detail","type":"tuple"},{"internalType":"enum FindTeam.Field[]","name":"fields","type":"uint8[]"}],"internalType":"struct FindTeam.Project","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum FindTeam.Field[]","name":"fields","type":"uint8[]"},{"internalType":"enum FindTeam.Job","name":"job","type":"uint8"}],"name":"list_projects","outputs":[{"components":[{"internalType":"string","name":"project_name","type":"string"},{"components":[{"internalType":"bool","name":"reseacher","type":"bool"},{"internalType":"bool","name":"designer","type":"bool"},{"internalType":"bool","name":"developer","type":"bool"},{"internalType":"bool","name":"investor","type":"bool"}],"internalType":"struct FindTeam.Want","name":"wanted_jobs","type":"tuple"},{"internalType":"enum FindTeam.Field[]","name":"fields","type":"uint8[]"},{"internalType":"string","name":"project_image","type":"string"},{"internalType":"string","name":"description","type":"string"}],"internalType":"struct FindTeam.ListProject[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"projects","outputs":[{"internalType":"string","name":"project_name","type":"string"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"project_image","type":"string"},{"components":[{"internalType":"bool","name":"reseacher","type":"bool"},{"internalType":"bool","name":"designer","type":"bool"},{"internalType":"bool","name":"developer","type":"bool"},{"internalType":"bool","name":"investor","type":"bool"}],"internalType":"struct FindTeam.Want","name":"wanted_jobs","type":"tuple"},{"internalType":"string","name":"description","type":"string"},{"components":[{"internalType":"enum FindTeam.CloseReason","name":"reason","type":"uint8"},{"internalType":"string","name":"close_description","type":"string"}],"internalType":"struct FindTeam.CloseDetail","name":"close_detail","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_project_name","type":"string"},{"internalType":"address","name":"account_id","type":"address"}],"name":"reject_application","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account_id","type":"address"}],"name":"show_account_info","outputs":[{"components":[{"internalType":"address","name":"account_id","type":"address"},{"internalType":"string","name":"nickname","type":"string"},{"internalType":"string","name":"profile_image","type":"string"},{"internalType":"string","name":"bio","type":"string"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"url","type":"string"}],"internalType":"struct FindTeam.SocialLink[]","name":"social_links","type":"tuple[]"},{"internalType":"string[]","name":"created_project_ids","type":"string[]"},{"internalType":"string[]","name":"joined_project_ids","type":"string[]"},{"internalType":"enum FindTeam.Job","name":"job","type":"uint8"}],"internalType":"struct FindTeam.Account","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_project_name","type":"string"}],"name":"show_project_info","outputs":[{"components":[{"internalType":"string","name":"project_name","type":"string"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"project_image","type":"string"},{"internalType":"string[]","name":"project_detail_images","type":"string[]"},{"internalType":"address[]","name":"team_members","type":"address[]"},{"internalType":"address[]","name":"appliers","type":"address[]"},{"components":[{"internalType":"bool","name":"reseacher","type":"bool"},{"internalType":"bool","name":"designer","type":"bool"},{"internalType":"bool","name":"developer","type":"bool"},{"internalType":"bool","name":"investor","type":"bool"}],"internalType":"struct FindTeam.Want","name":"wanted_jobs","type":"tuple"},{"internalType":"string","name":"description","type":"string"},{"components":[{"internalType":"enum FindTeam.CloseReason","name":"reason","type":"uint8"},{"internalType":"string","name":"close_description","type":"string"}],"internalType":"struct FindTeam.CloseDetail","name":"close_detail","type":"tuple"},{"internalType":"enum FindTeam.Field[]","name":"fields","type":"uint8[]"}],"internalType":"struct FindTeam.Project","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]`;

const concordiaContract = new Contract(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  ConcordiaAbi,
  provider,
);

export async function show_project_info(project_name: String) {
  try {
    let result = await concordiaContract.show_project_info(project_name);
    return result;
  } catch (err) {
    return err;
  }
}

export async function show_account_info(account_id: String) {
  try {
    console.log("getting");
    let result = await concordiaContract.show_account_info(account_id);
    return result;
  } catch (err) {
    console.log(err);
    return "";
  }
}

export async function get_projects() {
  try {
    console.log("getting");
    let result = await concordiaContract.projects(0);
    console.log("res", result);
    console.log("getted");
    return result;
  } catch (err) {
    return err;
  }
}

export async function create_project(
  signer: JsonRpcSigner,
  projectData: CreateProjectInterface,
) {
  try {
    console.log(JSON.stringify(projectData));
    const concordiaContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ConcordiaAbi,
      signer,
    );
    let tx = await concordiaContract.create_project(
      projectData.project_name,
      projectData.project_image,
      projectData.project_detail_images,
      projectData.wanted_jobs,
      projectData.description,
      projectData.fields,
    );
    return await tx.wait();
  } catch (e) {
    return e;
  }
}

export async function create_account(
  signer: JsonRpcSigner,
  accountData: CreateAccountInterface,
) {
  try {
    const concordiaContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ConcordiaAbi,
      signer,
    );
    let tx = await concordiaContract.create_account(
      accountData.nickname,
      accountData.image_url,
      accountData.links,
      accountData.bio,
      accountData.job,
    );
    return await tx.wait();
  } catch (err) {
    return err;
  }
}

export async function apply_for_project(
  signer: JsonRpcSigner,
  project_name: string,
) {
  try {
    const concordiaContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ConcordiaAbi,
      signer,
    );
    let tx = await concordiaContract.apply_for_project(project_name);
    return await tx.wait();
  } catch (err) {
    return err;
  }
}

export async function list_projects(fields: number[], job: number) {
  try {
    let result = await concordiaContract.list_projects(fields, job);
    return result;
  } catch (err) {
    return err;
  }
}

export async function closeProject(
  signer: JsonRpcSigner,
  closeProjectDetails: CloseProjectInterface,
) {
  try {
    const concordiaContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ConcordiaAbi,
      signer,
    );
    let tx = await concordiaContract.close_project(
      closeProjectDetails.project_name,
      closeProjectDetails.reason,
      closeProjectDetails.description,
    );
    return await tx.wait();
  } catch (err) {
    return err;
  }
}

export async function editAccount(signer: JsonRpcSigner) {}

export async function editProject(signer: JsonRpcSigner) {}

export async function reject_application(
  signer: JsonRpcSigner,
  project_name: string,
  account_id: string,
) {
  try {
    const concordiaContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ConcordiaAbi,
      signer,
    );
    let tx = await concordiaContract.reject_application(
      project_name,
      account_id,
    );
    return await tx.wait();
  } catch (err) {
    return err;
  }
}

export async function accept_application(
  signer: JsonRpcSigner,
  project_name: string,
  account_id: string,
) {
  try {
    const concordiaContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ConcordiaAbi,
      signer,
    );
    let tx = await concordiaContract.accept_application(
      project_name,
      account_id,
    );
    return await tx.wait();
  } catch (err) {
    return err;
  }
}
