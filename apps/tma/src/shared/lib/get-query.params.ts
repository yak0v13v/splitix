export function getQueryParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}
