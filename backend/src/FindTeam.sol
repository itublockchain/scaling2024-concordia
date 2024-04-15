// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract FindTeam {
    //     function remove(array uint index) public {
    //     // Move the last element into the place to delete
    //     firstArray[index] = firstArray[firstArray.length - 1];
    //     // Remove the last element
    //     firstArray.pop();
    // }

    enum CloseReason {
        Finished,
        Ongoing,
        Interrupted
    }

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
        CloseReason reason;
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
        Want wanted_jobs;
        string description;
        CloseDetail close_detail;
        Field[] fields;
    }

    struct ListProject {
        string project_name;
        Want wanted_jobs;
        Field[] fields;
        string project_image;
        string description;
    }

    mapping(address => Account) public accountmap;
    Project[] public projects;


    function show_project_info(string calldata _project_name) public view returns (Project memory) {
        for (uint256 i = 0; i < projects.length; i++) {
            if (keccak256(bytes(projects[i].project_name)) == keccak256(bytes(_project_name))) {
                return projects[i];
            }
        }
        revert("the project name does not exist");
    }

    function show_account_info(address _account_id) public view returns (Account memory) {
        return accountmap[_account_id];
    }

    function create_project(
        string calldata project_name,
        string calldata project_image,
        string[] calldata project_detail_images,
        Want calldata wanted_jobs,
        string calldata description,
        Field[] calldata fields
    ) public returns (Project memory) {
        for (uint256 i = 0; i < projects.length; i++) {
            if (keccak256(bytes(projects[i].project_name)) == keccak256(bytes(project_name))) {
                revert("project is alread exist");
            }
        }

        require(accountmap[msg.sender].account_id != address(0),"You have to create account before creating a project!");
        CloseDetail memory close_detail = CloseDetail(CloseReason.Ongoing, "project is open");

        Project memory project;
        project.project_name = project_name;
        project.owner = msg.sender;
        project.project_image = project_image;
        project.project_detail_images = project_detail_images;
        project.wanted_jobs = wanted_jobs;
        project.description = description;
        project.close_detail = close_detail;
        project.fields = fields;

        projects.push(project);

        accountmap[msg.sender].created_project_ids.push(projects[projects.length - 1].project_name);

        projects[projects.length - 1].team_members.push(msg.sender);

        return projects[projects.length - 1];
    }

    function create_account(
        string calldata nickname,
        string calldata image_url,
        SocialLink[] calldata links,
        string calldata bio,
        Job job
    ) public {
        require(accountmap[msg.sender].account_id == address(0), "this user has created an account before");
        Account storage newAccount = accountmap[msg.sender];

        newAccount.account_id = msg.sender;
        newAccount.nickname = nickname;
        newAccount.profile_image = image_url;
        newAccount.bio = bio;
        newAccount.job = job;

        for (uint256 i = 0; i < links.length; i++) {
            newAccount.social_links.push(SocialLink({name: links[i].name, url: links[i].url}));
        }

        accountmap[msg.sender] = newAccount;
    }

    function apply_for_project(string calldata project_name) public {
        uint index;
        for (uint256 i = 0; i < projects.length; i++) {
            if (keccak256(bytes(projects[i].project_name)) == keccak256(bytes(project_name))) {
                index = i;
                break;
            }
        }
        for (uint256 i = 0; i < projects[index].appliers.length; i++) {
            require(projects[index].owner != msg.sender, "Owner of the project cannot apply!");
            if (projects[index].appliers[i] == msg.sender) {
                revert("You have already applied for this project!");
            }
        }
        projects[index].appliers.push(msg.sender);
    }


    function accept_application(string calldata _project_name, address account_id) public {
        require(accountmap[msg.sender].account_id != address(0), "applier does not created account");
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
        string[] memory project_detail_images,
        Want calldata wanted_jobs,
        string calldata description,
        Field[] memory fields
    ) public returns (Project memory) {
        for (uint256 i = 0; i < projects.length; i++) {
            if (keccak256(bytes(projects[i].project_name)) == keccak256(bytes(project_name))) {
                require(msg.sender == projects[i].owner, "You are not the owner of the project");
                projects[i].project_image = project_image;
                projects[i].project_detail_images = project_detail_images;
                projects[i].wanted_jobs = wanted_jobs;
                projects[i].description = description;
                projects[i].fields = fields;
                return projects[i];
            }
        }
        revert("the project does not exist");
    }

    function editAccount(
        address account_id,
        string calldata nickname,
        string calldata profile_image,
        string calldata bio,
        SocialLink[] calldata social_links
    ) public returns (Account memory) {
        require(msg.sender==account_id,"You are not the owner of this account!");
        Account storage changeAccount = accountmap[account_id];
        changeAccount.nickname = nickname;
        changeAccount.profile_image = profile_image;
        changeAccount.bio = bio;
        for (uint256 i = 0; i < social_links.length; i++) {
            changeAccount.social_links.push(SocialLink({name: social_links[i].name, url: social_links[i].url}));
        }

        return changeAccount;
    }

    function closeProject(string calldata _project_name, CloseReason reason, string calldata description) public {
        for (uint256 i = 0; i < projects.length; i++) {
            if (keccak256(bytes(projects[i].project_name)) == keccak256(bytes(_project_name))) {
                require(projects[i].owner == msg.sender, "You are not the owner");
                require(projects[i].close_detail.reason == CloseReason.Ongoing, "Project already closed");
                projects[i].close_detail = CloseDetail(reason, description);
                break;
            }
        }
    }
}
