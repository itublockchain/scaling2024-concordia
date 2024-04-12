// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract FindTeam {
    //     function remove(array uint index) public {
    //     // Move the last element into the place to delete
    //     firstArray[index] = firstArray[firstArray.length - 1];
    //     // Remove the last element
    //     firstArray.pop();
    // }

    enum Job {
        Reseacher,
        Designer,
        Developer,
        Investor
    }
    // ayrı ayrı enumda mı tutalım,job enumunda mı tutalım

    enum Field {
        Defi,
        Wallet,
        Dao,
        DApp
    }

    struct Want {
        bool reseacher;
        bool designer;
        bool developer;
        bool investor;
    }

    struct SocialLink {
        string name;
        string url;
    }

    struct Account {
        address account_id;
        string nickname;
        string profile_image;
        string bio;
        SocialLink[] social_links;
        string[] created_project_ids;
        string[] joined_project_ids;
        Job job;
    }

    struct CloseDetail {
        bool is_closed;
        string close_description;
    }

    struct Project {
        //string project_id;
        string project_name;
        address owner;
        string project_image;
        string[] project_detail_images;
        address[] team_members;
        address[] appliers;
        Want wanted_fields;
        string description;
        CloseDetail close_detail;
    }

    struct ListProject {
        string project_name;
        Want wanted_fields;
        string project_image;
        string description;
    }

    mapping(address => Account) public accounts;

    Project[] public projects;

    function list_projects(Field[] calldata fields, Job job) public view returns (ListProject[] memory) {}

    //==========================================
    function list_finished_projects(Field[] calldata fields, Job job) public view {} //
    //==========================================

    function show_project_info(string calldata project_name) public view returns (Project memory) {}

    function show_account_info(address account_id) public view returns (Account memory) {}

    function create_project(
        string calldata name,
        Want calldata fields,
        string calldata project_image,
        string[] calldata project_detail_images,
        string calldata description
    ) public returns (Project memory) {
        // address[] memory team_members;
        // address[] memory appliers;
        // Project memory newProject = Project({
        //     project_name: name,
        //     wanted_fields: fields,
        //     description: description,
        //     team_members: team_members,
        //     appliers: appliers
        // });
        // projects.push(newProject);
        // return newProject;
    }

    function create_account(string calldata nickname, string[] calldata links, string calldata bio, Job job) public {}

    function apply_for_project(string calldata project_name) public {}

    function accept_application(string calldata project_name, address account_id) public {}
    function reject_application(string calldata project_name, address account_id) public {}

    //function addParticipant() public{}

    function editProject(
        string calldata project_name,
        string calldata project_image,
        string[] calldata project_detail_images,
        Want calldata wanted_fields,
        string calldata description
    ) public returns (Project memory) {}

    function editAccount(
        address account_id,
        string calldata profile_image,
        string calldata bio,
        SocialLink[] calldata social_links
    ) public returns (Account memory) {}

    function closeProject(string calldata project_name, string calldata description) public {}
}
