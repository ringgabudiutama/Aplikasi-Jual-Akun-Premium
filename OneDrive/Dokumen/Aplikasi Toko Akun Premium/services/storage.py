"""
Local storage service.
Menggunakan page.client_storage (setara localStorage browser / SharedPreferences
di Android) — 100% lokal di perangkat, TANPA backend, database, atau API.
"""
import json
import flet as ft

KEY_FAVORITES = "rifora_favorites"
KEY_PROFILE = "rifora_profile"

DEFAULT_PROFILE = {
    "name": "Pengguna Rifora",
    "username": "@rifora_user",
    "phone": "-",
    "address": "-",
    "email": "-",
    "avatar_seed": "R",
}


class LocalStorage:
    """Wrapper kecil supaya pemanggilan storage konsisten di semua halaman."""

    def __init__(self, page: ft.Page):
        self.page = page

    # ---------------- Favorites ----------------
    def get_favorites(self) -> list[str]:
        raw = self.page.client_storage.get(KEY_FAVORITES)
        if not raw:
            return []
        try:
            return json.loads(raw)
        except (json.JSONDecodeError, TypeError):
            return []

    def save_favorites(self, favorites: list[str]):
        self.page.client_storage.set(KEY_FAVORITES, json.dumps(favorites))

    def toggle_favorite(self, product_id: str) -> list[str]:
        favorites = self.get_favorites()
        if product_id in favorites:
            favorites.remove(product_id)
        else:
            favorites.append(product_id)
        self.save_favorites(favorites)
        return favorites

    # ---------------- Profile ----------------
    def get_profile(self) -> dict:
        raw = self.page.client_storage.get(KEY_PROFILE)
        if not raw:
            return dict(DEFAULT_PROFILE)
        try:
            data = json.loads(raw)
            merged = dict(DEFAULT_PROFILE)
            merged.update(data)
            return merged
        except (json.JSONDecodeError, TypeError):
            return dict(DEFAULT_PROFILE)

    def save_profile(self, profile: dict):
        self.page.client_storage.set(KEY_PROFILE, json.dumps(profile))
