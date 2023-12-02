document.addEventListener("DOMContentLoaded", function () {
    const darkButton = document.querySelector(".dark");
    const lightButton = document.querySelector(".light");
    const body = document.body;
    const title = document.querySelector(".header-title");
    const textElements = document.querySelectorAll(".box-light-dark, .search, main, .r-f-f, .user-name, .user-date, .bio, .repos-title, .followers-title, .following-title");
    const numericElements = document.querySelectorAll(".repos-number, .followers-number, .following-number");
    const searchInput = document.querySelector(".search-input");
    const searchAndMainElements = document.querySelectorAll(".search, main");

    function toggleTheme(isDark) {
        const theme = isDark ? "dark" : "light";

        body.style.backgroundColor = isDark ? "#141D2F" : "#F6F8FF";
        title.style.color = isDark ? "#FFFFFF" : "#222731";
        textElements.forEach((element) => (element.style.color = isDark ? "#FFFFFF" : "#2B3442"));
        searchInput.placeholder = "Search GitHub username...";
        searchInput.style.backgroundColor = isDark ? "#1E2A47" : "#FEFEFE";
        searchInput.style.color = isDark ? "#FFFFFF" : originalSearchInputColor;
        searchInput.style.placeholderColor = isDark ? "#4B6A9B" : "#FFFFFF";
        document.querySelector(".sun").style.display = isDark ? "inline-block" : "none";
        document.querySelector(".moon").style.display = isDark ? "none" : "inline-block";
        document.querySelector(".dark").style.display = isDark ? "none" : "inline-block";
        document.querySelector(".light").style.display = isDark ? "inline-block" : "none";
        document.querySelector(".light").style.color = isDark ? "#FFFFFF" : "#4B6A9B";
        document.querySelector(".light").style.textAlign = isDark ? "right" : "left";
        document.querySelector(".light").style.fontFamily = "Space Mono";
        document.querySelector(".light").style.fontSize = "13px";
        document.querySelector(".light").style.fontStyle = "normal";
        document.querySelector(".light").style.fontWeight = "700";
        document.querySelector(".light").style.lineHeight = "normal";
        document.querySelector(".light").style.letterSpacing = "2.5px";
        searchAndMainElements.forEach((element) => (element.style.backgroundColor = isDark ? "#1E2A47" : "#FEFEFE"));
        document.querySelector(".r-f-f").style.backgroundColor = isDark ? "#141D2F" : "#F6F8FF";
        numericElements.forEach((element) => (element.style.color = isDark ? "#FFFFFF" : "#2B3442"));
        const textElementsToColor = document.querySelectorAll(".location-text, .link-text, .twitter-text, .building-text");
        textElementsToColor.forEach((element) => {
            element.style.color = isDark ? "#FFFFFF" : "#2B3442";
        });
    }

    function displayNoResult(message) {
        const noResultMessage = document.querySelector(".no-result");
        if (!noResultMessage) {
            const errorMessage = document.createElement("div");
            errorMessage.className = "no-result";
            errorMessage.textContent = message;
            errorMessage.style.color = "red";
            errorMessage.style.position = "absolute";
            errorMessage.style.fontSize = "12px";
            errorMessage.style.left = "170px";
            errorMessage.style.top = "140px";
            if (window.innerWidth >= 768) {
                errorMessage.style.fontSize = "20px";
                errorMessage.style.left = "calc(50% + 30px)";
                errorMessage.style.top = "240px";
            }
            if (window.innerWidth >= 1440) {
                errorMessage.style.left = "calc(50% + 90px)";
                errorMessage.style.top = "245px";
            }
            searchInput.parentElement.appendChild(errorMessage);
        } else {
            noResultMessage.textContent = message;
        }
    }

    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function updateUserInformation(userData) {
        const userPhotoElement = document.querySelector(".user-photo img");
        const userNameElement = document.querySelector(".user-name");
        const usernameElement = document.querySelector(".user-username");
        const dateElement = document.querySelector(".user-date");
        const bioElement = document.querySelector(".bio");
        const reposNumberElement = document.querySelector(".repos-number");
        const followersNumberElement = document.querySelector(".followers-number");
        const followingNumberElement = document.querySelector(".following-number");

        if (userPhotoElement) {
            if (userData.avatar_url) {
                userPhotoElement.src = userData.avatar_url;
                userPhotoElement.style.width = "117px";
                userPhotoElement.style.height = "117px";
            } else {
                userPhotoElement.src = "./Assets/user-prof.svg";
            }
            const userPhotoContainer = document.querySelector(".user-photo");
            if (userPhotoContainer) {
                userPhotoContainer.style.width = "117px";
                userPhotoContainer.style.height = "117px";
                userPhotoContainer.style.borderRadius = "50%";
                userPhotoContainer.style.overflow = "hidden";
            }
        }

        if (userNameElement) {
            userNameElement.textContent = userData.name || "No Name";
        }

        if (usernameElement) {
            usernameElement.textContent = `@${userData.login || "NoUsername"}`;
        }

        if (dateElement) {
            dateElement.textContent = `Joined ${formatDate(userData.created_at)}`;
        }

        if (bioElement) {
            bioElement.textContent = userData.bio || "No bio available.";
        }

        if (reposNumberElement) {
            reposNumberElement.textContent = userData.public_repos || "0";
        }

        if (followersNumberElement) {
            followersNumberElement.textContent = userData.followers || "0";
        }

        if (followingNumberElement) {
            followingNumberElement.textContent = userData.following || "0";
        }
    }

    function updateSocialLinks(userData) {
        const locationTextElement = document.querySelector(".location-text");
        const linkTextElement = document.querySelector(".link-text");
        const twitterTextElement = document.querySelector(".twitter-text");
        const buildingTextElement = document.querySelector(".building-text");

        if (locationTextElement) {
            locationTextElement.textContent = userData.location || "Not Available";
        }

        if (linkTextElement) {
            linkTextElement.textContent = userData.blog || "Not Available";
        }

        if (twitterTextElement) {
            twitterTextElement.textContent = userData.twitter_username || "Not Available";
        }

        if (buildingTextElement) {
            buildingTextElement.textContent = userData.company || "Not Available";
        }
    }

    const originalSearchInputColor = window.getComputedStyle(searchInput).color;

    darkButton.addEventListener("click", function () {
        toggleTheme(true);
    });

    lightButton.addEventListener("click", function () {
        toggleTheme(false);
    });

    const searchButton = document.querySelector(".search-button");

    searchButton.addEventListener("click", function () {
        if(window.innerWidth >= 1440){
            
            const usernameElement = document.querySelector(".user-username");
            usernameElement.style.marginLeft = "-60px";
        }
        


        const username = searchInput.value.trim();
        if (username) {
            fetch(`https://api.github.com/users/${username}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("User not found");
                    }
                })
                .then((userData) => {
                    updateUserInformation(userData);
                    updateSocialLinks(userData);
                })
                .catch((error) => {
                    displayNoResult(error.message);
                });
        } else {
            displayNoResult("No Result");
        }
    });
});
