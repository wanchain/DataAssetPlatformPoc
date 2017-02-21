export default function loadAuth(req) {
	console.log(req.session.user);
  return Promise.resolve(req.session.user || null);
}
