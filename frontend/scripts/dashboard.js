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

function list_event_handler() {
	const id = this.dataset.id;
	load_vehicle_desc(id);
}

function load_vehicle_desc(vehicle_id) {
	const vehicle_info = data[vehicle_id];
	const name = document.querySelector(".vehicle-desc-name");
	name.innerText = vehicle_info["name"];
	const component_cont = document.querySelector(".component-list");
	const components = vehicle_info["components"];
	load_components(component_cont, components);
}

function load_components(component_cont, components) {
	while (component_cont.firstChild) {
		component_cont.removeChild(component_cont.lastChild);
	}
	for (const component in components) {
		const component_elm = document.createElement("h3");
		component_cont.appendChild(component_elm);
		component_elm.innerText = component;
	}
}
