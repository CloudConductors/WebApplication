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
	const comp_name_elm = document.createElement("h3");
	const last_service_elm = document.createElement("p");
	const days_till_fail_elm = document.createElement("p");
	const std_dev_elm = document.createElement("p");
	const recomended_maintenance_elm = document.createElement("p");
	comp_name_elm.innerText = "Name";
	last_service_elm.innerText = "Last Replaced";
	days_till_fail_elm.innerText = "Expected Failure";
	std_dev_elm.innerText = "Std Dev";
	recomended_maintenance_elm.innerText = "Recomended Maintenance";
	const component_elm = document.createElement("div");
	component_elm.classList.add("component_cont");
	component_cont.appendChild(component_elm);
	component_elm.appendChild(comp_name_elm);
	component_elm.appendChild(last_service_elm);
	component_elm.appendChild(days_till_fail_elm);
	component_elm.appendChild(std_dev_elm);
	component_elm.appendChild(recomended_maintenance_elm);
	for (const component in components) {
		const component_elm = document.createElement("div");
		component_elm.classList.add("component_cont");
		const comp_name_elm = document.createElement("h3");
		const last_service_elm = document.createElement("p");
		const days_till_fail_elm = document.createElement("p");
		const std_dev_elm = document.createElement("p");
		const recomended_maintenance_elm = document.createElement("p");
		const component_info = components[component];
		comp_name_elm.innerText = component;
		last_service_elm.innerText = component_info["last-replaced"];
		days_till_fail_elm.innerText = component_info["expected-failure"];
		std_dev_elm.innerText = component_info["std-dev"];
		recomended_maintenance_elm.innerText = component_info["recomended-maintenance"];
		component_cont.appendChild(component_elm);
		component_elm.appendChild(comp_name_elm);
		component_elm.appendChild(last_service_elm);
		component_elm.appendChild(days_till_fail_elm);
		component_elm.appendChild(std_dev_elm);
		component_elm.appendChild(recomended_maintenance_elm);
	}
}
