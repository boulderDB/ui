export default function extractRoleName(locationId, role) {
  return role.replace("ROLE_", "").replace(`@${locationId}`, "").toLowerCase();
}
