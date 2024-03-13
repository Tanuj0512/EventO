export default function cnatnd(...classes) {
	return classes.filter(Boolean).join(" ");
}
