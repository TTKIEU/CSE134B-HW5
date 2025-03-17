document.addEventListener("DOMContentLoaded", async () => {
    const projectList = document.getElementById("project-list");
    const searchInput = document.getElementById("Psrch");
    const filterDropdown = document.getElementById("language-filter");

    // Sample JSON data (Replace with fetch() for dynamic data)
    const projects = [
        {
            title: "OpenCL Image Convolution",
            image: "images/convolution.png",
            alt: "A visualization of image convolution",
            description: "Optimized OpenCL convolutional layer implementation for machine learning.",
            link: "proj1.html",
            languages: ["OpenCL", "C++"]
        },
        {
            title: "Successorator",
            image: "images/todo.png",
            alt: "Screenshot of Successorator app",
            description: " To-do list app that allows users to organize tasks efficiently, supporting categorization, priority settings, and deadlines",
            link: "proj2.html",
            languages: ["AndroidStudio", "Java"]
        },
        {
            title: "Bezier Curve Tool",
            image: "images/bezier-tool.png",
            alt: "Bezier curve visualization",
            description: "A custom tool for rendering and editing Bézier curves.",
            link: "proj3.html",
            languages: ["OpenGL"]
        }
    ];

    // Function to render project cards
    function renderProjects(filteredProjects) {
        projectList.innerHTML = ""; // Clear current projects
        filteredProjects.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("image", project.image);
            card.setAttribute("alt", project.alt);
            card.setAttribute("description", project.description);
            card.setAttribute("link", project.link);
            card.setAttribute("languages", project.languages.join(", ")); // Add languages as a string
            projectList.appendChild(card);
        });
    }

    // Initial render
    renderProjects(projects);

    // Filter function
    function filterProjects() {
        const searchText = searchInput.value.toLowerCase();
        const selectedLanguage = filterDropdown.value;

        const filtered = projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchText);
            const matchesLanguage = selectedLanguage === "all" || project.languages.includes(selectedLanguage);
            return matchesSearch && matchesLanguage;
        });

        renderProjects(filtered);
    }

    // Event Listeners for search and filter
    searchInput.addEventListener("input", filterProjects);
    filterDropdown.addEventListener("change", filterProjects);
});
