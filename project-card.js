class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "project-card.css"; 

        const template = document.createElement("template");
        template.innerHTML = `
            <h2></h2>
            <picture>
                <img src="" alt="">
            </picture>
            <p></p>
            <a target="_blank">View Project</a>
        `;

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["title", "image", "alt", "description", "link"];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.querySelector("h2").textContent = this.getAttribute("title") || "Untitled";
        this.shadowRoot.querySelector("img").src = this.getAttribute("image") || "default.jpg";
        this.shadowRoot.querySelector("img").alt = this.getAttribute("alt") || "Project image";
        this.shadowRoot.querySelector("p").textContent = this.getAttribute("description") || "No description available.";
        this.shadowRoot.querySelector("a").href = this.getAttribute("link") || "#";
    }
}

// Register the custom element
customElements.define("project-card", ProjectCard);
