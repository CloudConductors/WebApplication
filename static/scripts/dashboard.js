const vehicle_list = document.querySelector(".vehicle-cont");
const vehicles = ["v1", "v2", "v3"];

for (const vehicle of vehicles) {
	const vehicle_item = document.createElement("div");
	vehicle_item.classList.add("vehicle");
	const vehicle_header = document.createElement("div");
	vehicle_header.classList.add("vehicle-header");
	const vehicle_body = document.createElement("div");
	vehicle_body.classList.add("vehicle-body");
	vehicle_body.classList.add("hidden");
	const vehicle_name = document.createElement("h2");
	const body_details = document.createElement("p");

	vehicle_name.innerText = vehicle;
	body_details.innerText = "asjkhdf kjhf kljahsdfkj hasdhj fahsdl";
	vehicle_header.addEventListener("click", toggle_vehicle_body);

	vehicle_header.appendChild(vehicle_name);
	vehicle_body.appendChild(body_details);
	vehicle_item.appendChild(vehicle_header);
	vehicle_item.appendChild(vehicle_body);
	vehicle_list.appendChild(vehicle_item);
}

function toggle_vehicle_body(e) {
	const body = this.parentNode.children[1];
	if (body.classList.contains("hidden")) {
		body.classList.remove("hidden");
	} else {
		body.classList.add("hidden");
	}
}
