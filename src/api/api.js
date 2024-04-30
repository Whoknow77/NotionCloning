import { API_KEY, X_USER_NAME } from "../../config.js"

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_KEY}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USER_NAME,
      },
    })

    if (res.ok) {
      return await res.json()
    }
    throw new Error("API 처리중 뭔가 이상합니다.")
  } catch (e) {}
}
