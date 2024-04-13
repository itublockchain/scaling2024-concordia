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

    mapping(address => Account) public accountmap;
    Project[] public projects;

    function list_projects(Field[] calldata fields, Job job) public view returns (ListProject[] memory) {
        
    }

    //==========================================
    function list_finished_projects(Field[] calldata fields, Job job) public view {} //
    //==========================================

    function show_project_info(string calldata _project_name) public view returns (Project memory) {
    for (uint256 i = 0; i < projects.length; i++) {
        if (keccak256(bytes(projects[i].project_name)) == keccak256(bytes(_project_name))) {
            return projects[i];
        }
    }
    // Add a default return statement if project not found
    return Project("", address(0), "", new string[](0), new address[](0), new address[](0), Want(false, false, false, false), "", CloseDetail(false, ""));
}

    function show_account_info(address _account_id) public view returns (Account memory) {
        return accountmap[_account_id];
    }

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

    function create_account(
    string calldata nickname,
    string calldata image_url,
    SocialLink[] calldata links,
    string calldata bio,
    Job job
) public {
    require(accountmap[msg.sender].account_id != address(0), "this user has created an account before");
    Account storage newAccount = accountmap[msg.sender];

    newAccount.account_id = msg.sender;
    newAccount.nickname = nickname;
    newAccount.profile_image = image_url;
    newAccount.bio = bio;
    newAccount.job = job;

    for (uint i = 0; i < links.length; i++) {
        newAccount.social_links.push(SocialLink({
            name: links[i].name,
            url: links[i].url
        }));
    }

    accountmap[msg.sender] = newAccount;
}


    function apply_for_project(string calldata project_name) public {}

    function accept_application(string calldata _project_name, address account_id) public {

        require(accountmap[msg.sender].account_id == address(0),"applier does not created account");
        uint256 index;

    for (uint256 i = 0; i < projects.length; i++) {
        if (keccak256(bytes(projects[i].project_name)) == keccak256(bytes(_project_name))) {
            index = i;
            break;
        }
    }

        require(msg.sender == projects[index].owner, "Only project owner can accept applications");
        
        bool isApplier = false;

    for (uint256 i = 0; i < projects[index].appliers.length; i++) {
        if (projects[index].appliers[i] == account_id) {
            isApplier = true;
            break;
        }
    }

    require(isApplier, "Account has not applied for this project");

    for (uint256 i = 0; i < projects[index].appliers.length; i++) {
    if (projects[index].appliers[i] == account_id) {
        projects[index].team_members.push(account_id);
        projects[index].appliers[i] = projects[index].appliers[projects[index].appliers.length - 1];
        projects[index].appliers.pop();
        break;
    }

    accountmap[msg.sender].joined_project_ids.push(projects[index].project_name);
}
    }
    
    function reject_application(string calldata _project_name, address account_id) public {
                
        uint256 index;

    for (uint256 i = 0; i < projects.length; i++) {
        if (keccak256(bytes(projects[i].project_name)) == keccak256(bytes(_project_name))) {
            index = i;
            break;
        }
    }

        require(msg.sender == projects[index].owner, "Only project owner can accept applications");
        
        bool isApplier = false;

    for (uint256 i = 0; i < projects[index].appliers.length; i++) {
        if (projects[index].appliers[i] == account_id) {
            isApplier = true;
            break;
        }
    }
    
    require(isApplier, "Account has not applied for this project");

    for (uint256 i = 0; i < projects[index].appliers.length; i++) {
    if (projects[index].appliers[i] == account_id) {
        projects[index].team_members.push(account_id);
        projects[index].appliers[i] = projects[index].appliers[projects[index].appliers.length - 1];
        projects[index].appliers.pop();
        break;
    }
}
    }
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
        string calldata nickname,
        string calldata profile_image,
        string calldata bio,
        SocialLink[] calldata social_links
    ) public returns (Account memory) {

        Account memory changeAccount = accountmap[account_id];
        changeAccount.nickname=nickname;
        changeAccount.profile_image=profile_image;
        changeAccount.bio=bio;
        changeAccount.social_links=social_links;

        return changeAccount;
    }

    function closeProject(string calldata _project_name, string calldata description) public {
        for(uint256 i = 0; i < projects.length; i++) {
            if(keccak256(bytes(projects[i].project_name)) == keccak256(bytes(_project_name))) {
                require(projects[i].owner != msg.sender, "You are not the owner");
                require(projects[i].close_detail.is_closed == true, "Project already closed");
                projects[i].close_detail = CloseDetail(true,description);
                break;
            }
        }
    }
    }