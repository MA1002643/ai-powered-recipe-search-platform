<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<h1 align="center">AI-POWERED-RECIPE-SEARCH-PLATFORM</h1>
<p align="center"><em>Discover Deliciousness Instantly, Powered by AI</em></p>

<!-- BADGES -->
<a href="https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/main/LICENSE" alt="license">
   <img src="https://img.shields.io/badge/license-MIT-green?style=flat&logo=opensourceinitiative&logoColor=white" alt="MIT License" />
</a>
<img src="https://img.shields.io/github/last-commit/MA1002643/ai-powered-recipe-search-platform?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<a href="https://github.com/MA1002643/ai-powered-recipe-search-platform/discussions" alt="Discussions">
   <img src="https://img.shields.io/github/discussions/MA1002643/ai-powered-recipe-search-platform" alt="Discussions" />
</a>
<a href="https://github.com/MA1002643/ai-powered-recipe-search-platform/stargazers">
   <img src="https://custom-icon-badges.demolab.com/github/stars/MA1002643/ai-powered-recipe-search-platform?logo=star&style=flat" alt="stars" />
</a>
<a href="https://github.com/MA1002643/ai-powered-recipe-search-platform/issues">
   <img src="https://custom-icon-badges.demolab.com/github/issues-raw/MA1002643/ai-powered-recipe-search-platform?logo=issue" alt="issues" />
</a>
<br>
<br>
<em>Built with the tools and technologies:</em>
<br>
<br>
<!-- TECH-STACK:START -->

<!-- TECH-STACK:END -->
</div>
<br>

---

## 📄 Table of Contents

- [Overview](#overview)
- [UI Preview](#ui-preview)
- [Features](#features)
- [Project Structure](#project-structure)
  - [Project Index](#project-index)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [Learning Outcomes](#learning-outcomes)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [Acknowledgment](#acknowledgment)
- [License](#license)

---

<a id="overview"></a>

## ✨ Overview

**AI-Powered Recipe Search Platform** is a working application that helps users **find recipes from the ingredients they provide**. The repository contains a **Frontend** (Vue-based UI) and a **Backend** folder, reflecting a full project that runs end-to-end, not just a boilerplate template.

### What it does (factually)

- **Ingredient-driven search:** Users enter one or more ingredients; the app returns relevant recipe ideas powered by an AI-assisted search flow.
- **Personalised suggestions & filtering:** Designed to surface recipes aligned to user inputs (with support for refinement/personalisation as implemented in the repo).
- **Full project layout:** Separate **Frontend** and **Backend** directories, plus project config, making it clear how to run and extend each part.

> Tech snapshot (from the repo): primary languages are **JavaScript** and **Vue**, with a small amount of **HTML**; the repo includes distinct **Frontend** and **Backend** folders.

**Why ai-powered-recipe-search-platform?**

The core features include:

- 🧩 **🔌 API Integration:** Securely connect with external services like Spoonacular for rich recipe data.
- 🚀 **🔐 User Authentication:** Manage user accounts, login, and personalised recipe collections.
- 🎨 **🖥️ Dynamic UI:** Responsive, modular frontend with Vue.js for engaging user experiences.
- 🛠️ **⚙️ Modular Architecture:** Well-structured codebase supporting customisation and scalability.
- 📚 **📖 Recipe Management:** Create, view, save, and delete recipes with ease.

---

<a id="ui-preview"></a>

## 🎨 UI Preview

|                     Recipe Search                     |                    Dashboard                    |
| :---------------------------------------------------: | :---------------------------------------------: |
| ![Recipe search screenshot](screenshots/chatroom.png) | ![search in action GIF](screenshots/search.gif) |

---

<a id="features"></a>

## 📌 Features

|     | Component         | Details                                                                                                                               |
| :-- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**  | <ul><li>Client-server model with Vue.js frontend and Node.js backend</li><li>RESTful API design with Swagger documentation</li></ul>  |
| 🔩  | **Code Quality**  | <ul><li>Consistent code style with ESLint and Prettier</li><li>Modular folder structure separating frontend and backend</li></ul>     |
| 📄  | **Documentation** | <ul><li>Auto-generated Swagger API docs</li><li>README files with setup instructions</li></ul>                                        |
| 🔌  | **Integrations**  | <ul><li>Vue.js with Vue Router and Vuex for state management</li><li>Axios for API calls</li><li>Swagger UI for API testing</li></ul> |
| 🧩  | **Modularity**    | <ul><li>Frontend components organised by feature</li><li>Backend routes and controllers separated</li></ul>                           |
| 🧪  | **Testing**       | <ul><li>Backend tests with Mocha and Chai</li><li>Frontend tests with Vue Test Utils</li></ul>                                        |
| ⚡️ | **Performance**   | <ul><li>Vite.js used for fast frontend bundling</li><li>Lazy loading of Vue components</li></ul>                                      |
| 🛡️  | **Security**      | <ul><li>Input validation with Joi and email-validator</li><li>CORS enabled for cross-origin requests</li></ul>                        |
| 📦  | **Dependencies**  | <ul><li>Frontend: Vue.js, Vite, Axios, BootstrapVue</li><li>Backend: Express, sqlite3, Swagger-autogen</li></ul>                      |

---

<a id="project-structure"></a>

## 📁 Project Structure

```sh
└── ai-powered-recipe-search-platform/
    ├── Backend
    │   ├── .gitignore
    │   ├── LICENSE
    │   ├── README.md
    │   ├── app
    │   ├── database.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── server.js
    │   ├── swagger.js
    │   └── swagger.json
    ├── Frontend
    │   ├── .vscode
    │   ├── README.md
    │   └── Recipe-Frontend
    └── config.js
```

---

<a id="project-index"></a>

### 📑 Project Index

<details open>
	<summary><b><code>AI-POWERED-RECIPE-SEARCH-PLATFORM/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/config.js'>config.js</a></b></td>
					<td style='padding: 8px;'>- Provides the API key necessary for authenticating requests to external services, enabling secure and authorized communication within the application<br>- Serves as a central configuration point that supports seamless integration with third-party APIs, ensuring consistent access credentials across the codebase and facilitating smooth operation of features dependent on external data sources.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- Frontend Submodule -->
	<details>
		<summary><b>Frontend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ Frontend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Provides an overview of the frontend architecture, outlining its role in delivering the user interface and facilitating seamless interaction within the overall application<br>- It highlights how the frontend integrates with backend services to enable dynamic content rendering and user engagement, ensuring a cohesive and responsive user experience across the platform.</td>
				</tr>
			</table>
			<!-- Recipe-Frontend Submodule -->
			<details>
				<summary><b>Recipe-Frontend</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ Frontend.Recipe-Frontend</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/LICENSE'>LICENSE</a></b></td>
							<td style='padding: 8px;'>- Provides the licensing information affirming the softwares public domain status, ensuring users understand the permissive rights to copy, modify, and distribute the frontend codebase<br>- This declaration supports open-source collaboration and clarifies legal usage, contributing to the projects overall architecture by establishing a foundation of free and unrestricted software distribution.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/CODE_OF_CONDUCT.md'>CODE_OF_CONDUCT.md</a></b></td>
							<td style='padding: 8px;'>- Defines the community standards and behavioral expectations for contributors within the project’s ecosystem<br>- It promotes a respectful, inclusive, and harassment-free environment, ensuring all participants can collaborate effectively<br>- Serving as a guiding document, it reinforces the projects commitment to maintaining a positive and professional community atmosphere across all engagement channels.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/package.json'>package.json</a></b></td>
							<td style='padding: 8px;'>- Defines the configuration and dependencies for the frontend application, enabling seamless development, building, and previewing of the user interface<br>- It orchestrates the setup of Vue.js components, routing, and styling frameworks, ensuring a cohesive and efficient environment for creating an interactive recipe management experience within the overall project architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/vite.config.js'>vite.config.js</a></b></td>
							<td style='padding: 8px;'>- Configures the development environment for the Vue.js frontend by setting up module resolution and plugin integration<br>- It ensures seamless aliasing of project paths and incorporates Vue-specific tooling, facilitating efficient development and build processes within the overall application architecture<br>- This setup supports smooth navigation and component management across the frontend codebase.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/index.html'>index.html</a></b></td>
							<td style='padding: 8px;'>- Sets up the main entry point for the frontend application, establishing the initial HTML structure and linking the primary JavaScript module<br>- It facilitates rendering the user interface within the designated app container, enabling the dynamic loading and interaction of the recipe management features within the overall architecture.</td>
						</tr>
					</table>
					<!-- src Submodule -->
					<details>
						<summary><b>src</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ Frontend.Recipe-Frontend.src</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/main.js'>main.js</a></b></td>
									<td style='padding: 8px;'>- Initialize and configure the Vue.js application by integrating core dependencies, including routing and UI frameworks, to establish the primary entry point for the frontend<br>- This setup enables seamless navigation and consistent styling across the application, serving as the foundation for user interactions and dynamic content rendering within the overall project architecture.</td>
								</tr>
							</table>
							<!-- views Submodule -->
							<details>
								<summary><b>views</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ Frontend.Recipe-Frontend.src.views</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/App.vue'>App.vue</a></b></td>
											<td style='padding: 8px;'>- Defines the primary navigation interface for the Recipe Finder application, enabling users to seamlessly access the home page, feed, dashboard, and login functionalities<br>- Serves as the central layout component within the frontend architecture, facilitating consistent navigation across different views and integrating routing logic to manage user interactions within the app.</td>
										</tr>
									</table>
									<!-- pages Submodule -->
									<details>
										<summary><b>pages</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ Frontend.Recipe-Frontend.src.views.pages</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/pages/Recipe.vue'>Recipe.vue</a></b></td>
													<td style='padding: 8px;'>- Displays detailed information for a specific recipe, including title, image, ingredients, and directions, while enabling users to save the recipe to their personal collection<br>- Integrates with backend services to fetch recipe data and manage saved recipes, supporting seamless user interaction within the overall application architecture focused on recipe discovery and personalization.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/pages/Feed.vue'>Feed.vue</a></b></td>
													<td style='padding: 8px;'>- Displays a dynamic feed of recipe summaries, showcasing recent or popular recipes with images, titles, and brief directions<br>- Integrates with a feed service to fetch data upon loading, enabling users to browse and navigate to detailed recipe pages seamlessly<br>- Serves as the main interface for engaging users with curated recipe content within the applications architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/pages/Signup.vue'>Signup.vue</a></b></td>
													<td style='padding: 8px;'>- Facilitates user registration by providing a responsive signup form integrated with validation and backend user creation services<br>- It captures essential user details, validates input, and handles form submission, enabling new users to create accounts and navigate seamlessly to the login page within the overall authentication flow of the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/pages/RecipeCreate.vue'>RecipeCreate.vue</a></b></td>
													<td style='padding: 8px;'>- Facilitates user-generated recipe creation by providing a form interface for inputting recipe details such as title, ingredients, directions, and image URL<br>- Integrates with backend services to submit new recipes and navigates users to the dashboard upon successful posting<br>- Supports the overall architecture by enabling dynamic content addition and enhancing user engagement within the recipe management system.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/pages/Dashboard.vue'>Dashboard.vue</a></b></td>
													<td style='padding: 8px;'>- Provides a user-centric dashboard interface for managing recipes, displaying saved and personal recipes with options to view, create, or delete entries<br>- Facilitates seamless navigation and interaction within the recipe management system, integrating data fetching, user actions, and routing to enhance the overall user experience in the application architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/pages/Login.vue'>Login.vue</a></b></td>
													<td style='padding: 8px;'>- Implements the user login interface, enabling authentication by capturing email and password inputs, validating credentials, and handling login requests through the user service<br>- Facilitates navigation to the dashboard upon successful login, integrating seamlessly into the overall application flow and ensuring secure access control within the frontend architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/pages/Home.vue'>Home.vue</a></b></td>
													<td style='padding: 8px;'>- Facilitates user interaction for searching recipes based on pantry items, enabling dynamic ingredient management and recipe retrieval<br>- Integrates with backend services to fetch and display recipe details, while allowing users to save preferred recipes<br>- Serves as the primary interface for users to input ingredients, view suggested recipes, and manage their recipe collection within the applications architecture.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- components Submodule -->
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ Frontend.Recipe-Frontend.src.views.components</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/components/recipe_modal.vue'>recipe_modal.vue</a></b></td>
													<td style='padding: 8px;'>- Displays detailed recipe information within a modal interface, including images, instructions, and ingredients, to enhance user engagement and experience<br>- Integrates with backend services to fetch and manage recipe data, supporting seamless viewing and interaction with individual recipes in the broader application architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/views/components/button_test.vue'>button_test.vue</a></b></td>
													<td style='padding: 8px;'>- Provides a reusable dropdown button component for user interactions within the frontend interface<br>- It facilitates consistent action menus across the application, enabling users to access multiple options through a compact, intuitive UI element<br>- This component integrates seamlessly into the overall architecture, supporting dynamic and accessible user workflows in the recipe management platform.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- router Submodule -->
							<details>
								<summary><b>router</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ Frontend.Recipe-Frontend.src.router</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/router/index.js'>index.js</a></b></td>
											<td style='padding: 8px;'>- Defines the client-side routing structure for the application, managing navigation between pages such as Home, Feed, Recipe details, Dashboard, and authentication screens<br>- Implements route guards to restrict access to sensitive pages like Dashboard and Recipe creation, ensuring users are authenticated before proceeding<br>- Facilitates seamless, secure navigation aligned with the overall architecture of the Vue.js frontend.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- services Submodule -->
							<details>
								<summary><b>services</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ Frontend.Recipe-Frontend.src.services</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/services/users.service.js'>users.service.js</a></b></td>
											<td style='padding: 8px;'>- Provides user authentication and account management functionalities within the frontend architecture<br>- Facilitates user login, logout, and registration processes by interacting with backend API endpoints, managing session tokens, and storing user identifiers<br>- Integrates seamlessly into the overall application flow, enabling secure user sessions and account creation for the recipe management platform.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/services/recipes.service.js'>recipes.service.js</a></b></td>
											<td style='padding: 8px;'>- Provides core functionalities for interacting with the Spoonacular API and local backend to search, retrieve, save, and manage recipes<br>- Facilitates fetching recipes based on pantry ingredients, obtaining detailed recipe information, and handling user-specific recipe data, including saved and authored recipes<br>- Serves as the primary service layer connecting frontend recipe features with external and internal data sources within the architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Frontend/Recipe-Frontend/src/services/feed.service.js'>feed.service.js</a></b></td>
											<td style='padding: 8px;'>- Provides core functionalities for interacting with the recipe feed, enabling retrieval of all recipes, fetching individual recipe details, and submitting new recipes<br>- Serves as a key service layer within the frontend architecture, facilitating seamless communication with the backend API to support user engagement and content management in the recipe application.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- Backend Submodule -->
	<details>
		<summary><b>Backend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ Backend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/LICENSE'>LICENSE</a></b></td>
					<td style='padding: 8px;'>- Provides a public domain license declaration, ensuring the entire codebase is freely available for use, modification, and distribution without restrictions<br>- This promotes open collaboration and broad accessibility across the project’s architecture, emphasizing a commitment to open-source principles and legal clarity for all contributors and users.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/server.js'>server.js</a></b></td>
					<td style='padding: 8px;'>- Sets up the backend server infrastructure, establishing core middleware, routing, and API documentation<br>- It orchestrates server initialization, handles request parsing, logging, and cross-origin resource sharing, while integrating route modules for user, recipe, and rating management<br>- Serves as the central entry point, ensuring the application is accessible, well-documented, and ready to handle client interactions within the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Provides the core backend functionality for the recipe finder app, enabling data management, user interactions, and recipe retrieval<br>- It orchestrates server-side operations, supporting seamless communication between the frontend interface and the database<br>- This component ensures reliable processing of user requests and maintains the applications overall data integrity within the architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/swagger.js'>swagger.js</a></b></td>
					<td style='padding: 8px;'>- Generates a comprehensive Swagger API documentation file based on the server implementation, facilitating clear and automated API specifications<br>- Integrates seamlessly into the backend architecture to ensure up-to-date, accessible API details for development, testing, and client consumption, thereby enhancing overall project maintainability and collaboration.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/database.js'>database.js</a></b></td>
					<td style='padding: 8px;'>- Defines and initializes the database schema for user management, recipe content, ratings, and saved recipes within the application<br>- Facilitates persistent data storage, ensuring structured relationships among users, recipes, and interactions, while also seeding initial data such as an admin account and sample recipes to support core functionalities of the platform.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the core backend infrastructure for the recipe finder application, enabling server setup, API routing, and documentation generation<br>- Facilitates client-server communication, handles data validation, and manages dependencies essential for executing and testing backend functionalities within the overall architecture<br>- Ensures a scalable foundation for integrating recipe data and user interactions.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/swagger.json'>swagger.json</a></b></td>
					<td style='padding: 8px;'>- Defines the REST API schema for user management, authentication, recipe CRUD operations, and ratings<br>- Serves as the blueprint guiding client-server interactions, ensuring consistent data exchange and functionality across the backend architecture<br>- Facilitates seamless integration and communication within the overall system, supporting core features like user registration, login, recipe handling, and rating management.</td>
				</tr>
			</table>
			<!-- app Submodule -->
			<details>
				<summary><b>app</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ Backend.app</b></code>
					<!-- controllers Submodule -->
					<details>
						<summary><b>controllers</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ Backend.app.controllers</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/controllers/users.controller.js'>users.controller.js</a></b></td>
									<td style='padding: 8px;'>- Provides core user management functionalities, including retrieving user data, creating new users, and handling authentication processes<br>- Facilitates user registration, login, and logout workflows, ensuring secure session handling through token management<br>- Integrates with the broader backend architecture to support user-related operations and maintain application security and data integrity.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/controllers/recipe.controller.js'>recipe.controller.js</a></b></td>
									<td style='padding: 8px;'>- Defines controller functions for managing recipe data, including retrieval, creation, updating, deletion, and user-specific actions<br>- Facilitates interaction between client requests and database models, ensuring proper validation, authorization, and error handling<br>- Integrates user authentication via tokens and supports operations for both public and saved recipes, forming a core component of the backends recipe management architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/controllers/ratings.controller.js'>ratings.controller.js</a></b></td>
									<td style='padding: 8px;'>- Handles user interactions for recipe ratings by enabling retrieval and submission of ratings<br>- Ensures proper validation, authentication, and error handling to maintain data integrity and security within the applications rating system<br>- Integrates seamlessly with recipe and user models to support accurate and consistent rating data across the platform.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- models Submodule -->
					<details>
						<summary><b>models</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ Backend.app.models</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/models/ratings.model.js'>ratings.model.js</a></b></td>
									<td style='padding: 8px;'>- Provides core functionality for managing recipe ratings within the application<br>- Facilitates adding new ratings and retrieving aggregated rating data for specific recipes, supporting features that enable users to evaluate and discover popular or highly-rated recipes<br>- Integrates seamlessly into the backend architecture, ensuring accurate and efficient handling of rating-related data.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/models/users.model.js'>users.model.js</a></b></td>
									<td style='padding: 8px;'>- Defines user data management and authentication functionalities within the backend architecture<br>- Facilitates retrieval, creation, and validation of user information, including secure password handling and session token management<br>- Serves as a core component for user identity and access control, supporting secure interactions across the applications user-related workflows.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/models/recipe.model.js'>recipe.model.js</a></b></td>
									<td style='padding: 8px;'>- Defines core data operations for managing recipes within the application, including retrieval, creation, updating, deletion, and user-specific interactions<br>- Facilitates seamless integration between the user interface and the database, supporting features like recipe sharing, saving favorites, and personalized content management, thereby underpinning the backend architecture for recipe content handling.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- libs Submodule -->
					<details>
						<summary><b>libs</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ Backend.app.libs</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/libs/middleware.js'>middleware.js</a></b></td>
									<td style='padding: 8px;'>- Implements authentication middleware to verify user identity via token validation, ensuring secure access control across the backend API<br>- Integrates with user management to authenticate requests, supporting the overall security architecture of the application<br>- This middleware acts as a gatekeeper, safeguarding protected routes and maintaining user session integrity within the system.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- routes Submodule -->
					<details>
						<summary><b>routes</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ Backend.app.routes</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/routes/ratings.routes.js'>ratings.routes.js</a></b></td>
									<td style='padding: 8px;'>- Defines API endpoints for managing recipe ratings, enabling users to submit new ratings and retrieve existing ones<br>- Integrates authentication middleware to secure rating submissions, supporting the broader functionality of user interaction with recipes<br>- Serves as a key component in the backend architecture for fostering user engagement and feedback within the recipe platform.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/routes/users.routes.js'>users.routes.js</a></b></td>
									<td style='padding: 8px;'>- Defines the user-related API endpoints for registration, login, logout, and retrieval of individual user data, integrating authentication middleware to secure sensitive routes<br>- Serves as a central routing hub within the backend architecture, facilitating user management and ensuring proper access control across the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/master/Backend/app/routes/recipe.routes.js'>recipe.routes.js</a></b></td>
									<td style='padding: 8px;'>- Defines API endpoints for managing recipes, enabling retrieval, creation, updating, and deletion of recipe data<br>- Incorporates user authentication for protected actions such as updating, deleting, and saving recipes<br>- Facilitates user-specific recipe access and saved recipe management, integrating core functionalities within the backend architecture to support a comprehensive recipe management system.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

<a id="getting-started"></a>

## 🚀 Getting Started

<a id="prerequisites"></a>

### 📋 Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** Npm

<a id="installation"></a>

### ⚙️ Installation

Build ai-powered-recipe-search-platform from the source and install dependencies:

1. **Clone the repository:**

   ```sh
   ❯ git clone https://github.com/MA1002643/ai-powered-recipe-search-platform
   ```

2. **Navigate to the project directory:**

   ```sh
   ❯ cd ai-powered-recipe-search-platform
   ```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

<a id="usage"></a>

### 💻 Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

<a id="testing"></a>

### 🧪 Testing

Ai-powered-recipe-search-platform uses the {**test_framework**} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

<a id="learning-outcomes"></a>

## 🎓 Learning Outcomes

- Developed a **full-stack recipe search application** where users enter ingredients and receive tailored recipe suggestions — gaining hands-on experience in designing end-to-end flows.
- Built a **client-side UI** using modern JavaScript frameworks (frontend) and integrated it with a backend service to process input and return results — strengthening understanding of **server-client interaction**.
- Engineered **search logic** and **data fetching patterns** enabling dynamic retrieval of recipes, enhancing skills in **asynchronous programming** and **RESTful API design**.
- Applied **frontend state management** and **UI responsiveness** to create an intuitive user experience for ingredient input, search results display, and result filtering.
- Practiced **database or external API integration** (as applicable) to support recipe lookup, refining knowledge of **data retrieval**, **transformation**, and **presentation layers**.
- Structured the project with **modular architecture** (separating routes, controllers, and frontend components) to improve maintainability, scalability, and readability.
- Implemented **input validation** and **error handling** to ensure stability and robustness of the search workflow, raising awareness of **secure and reliable web app practices**.
- Employed **version control workflows**, **documentation standards**, and **deployment readiness** as part of delivering a **production-capable full-stack project**.

---

<a id="roadmap"></a>

## 📈 Roadmap

- [ ] **`Task 1`**: Implement feature one.
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

<a id="contributors"></a>

## 🤝 Contributors

<p align="left">
<!-- CONTRIBUTORS:START -->

<!-- CONTRIBUTORS:END -->
</p>

---

<a id="acknowledgment"></a>

## ✨ Acknowledgments

- Built as part of an **AI-powered full-stack project** showcasing ingredient-based recipe discovery.
- Inspired by **modern intelligent cooking platforms** that simplify meal creation through smart search.
- Thanks to the **open-source community** and **mentors** for enabling innovation across both frontend and backend development.

---

<a id="license"></a>

## 📜 License

This project is licensed under the **[MIT License](https://github.com/MA1002643/ai-powered-recipe-search-platform/blob/main/LICENSE)**. See the **[LICENSE](https://choosealicense.com/licenses/)** file for full details.

#

<p align="center">
  <strong>© 2025 Muhammad Abdullah</strong><br>
  Developed with 💙 using JavaScript, Vue and HTML<br>
  <a href="#top"><img alt="Back to Top" src="https://img.shields.io/badge/Back_to_Top-0A0A0A?style=for-the-badge">
</a>
</p>
