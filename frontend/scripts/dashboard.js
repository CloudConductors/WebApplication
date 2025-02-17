const api_ip = "http://127.0.0.1:5000"
let data = null;
main();

async function main() {
	data = await fetch(api_ip + "/train-info", {
		"method": "GET",
	},);
	console.log(data);
	data = await data.json();
	console.log(data);
	load_vehicle_list(data);
	//load_vehicles(vehicles);
}

function load_vehicle_list(vehicles) {
	const vehicle_list = document.querySelector(".vehicle-list");
	const vehicle_desc = document.querySelector(".vehicle-desc");
	for (const id in vehicles) {
		const list_item = document.createElement("li");
		const itemData = vehicles[id];
		list_item.setAttribute("data-id", id);
		list_item.innerText = itemData["name"];
		list_item.addEventListener("click", list_event_handler)
		vehicle_list.appendChild(list_item);
		if (vehicle_desc.innerText === "") {
			load_vehicle_desc(id);
		}
	}
}

function list_event_handler(e) {
	const id = this.dataset.id;
	load_vehicle_desc(id);
}

function load_vehicle_desc(vehicle_id) {
	const vehicle_desc = document.querySelector(".vehicle-desc");
	while (vehicle_desc.firstChild) {
		vehicle_desc.removeChild(vehicle_desc.lastChild);
	}
	console.log(data);
	console.log(vehicle_id);
	const vehicle_info = data[vehicle_id];
	console.log(vehicle_info);
	const name = document.createElement("h2");
	name.innerText = vehicle_info["name"];
	const desc = document.createElement("p");
	desc.innerText = vehicle_info["name"];
	vehicle_desc.appendChild(name);
	vehicle_desc.appendChild(desc);
}

function load_vehicles(vehicles) {
	const vehicle_list = document.querySelector(".vehicle-list");
	for (const vehicle_id in vehicles) {
		const vehicle_item = document.createElement("div");
		vehicle_item.classList.add("vehicle");
		const vehicle_header = document.createElement("div");
		vehicle_header.classList.add("vehicle-header");
		const vehicle_body = document.createElement("div");
		vehicle_body.classList.add("vehicle-body");
		vehicle_body.classList.add("hidden");
		const vehicle_name = document.createElement("h2");
		const body_details = document.createElement("p");

		console.log(vehicle_id);
		console.log(vehicles);
		vehicle_name.innerText = vehicles[vehicle_id]["name"];
		load_components(body_details, vehicles[vehicle_id]["components"]);
		vehicle_header.addEventListener("click", toggle_vehicle_body);

		vehicle_header.appendChild(vehicle_name);
		vehicle_body.appendChild(body_details);
		vehicle_item.appendChild(vehicle_header);
		vehicle_item.appendChild(vehicle_body);
		vehicle_list.appendChild(vehicle_item);
	}
}

function toggle_vehicle_body(e) {
	const body = this.parentNode.children[1];
	if (body.classList.contains("hidden")) {
		body.classList.remove("hidden");
	} else {
		body.classList.add("hidden");
	}
}

function load_components(body_details, components) {
	for (const component in components) {
		const component_elm = document.createElement("h3");
		body_details.appendChild(component_elm);
		component_elm.innerText = component;
	}
}
