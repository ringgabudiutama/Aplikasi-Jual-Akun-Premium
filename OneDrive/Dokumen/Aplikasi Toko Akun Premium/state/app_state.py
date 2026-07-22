"""
State management terpusat untuk Rifora Premium.
Menyimpan state yang dipakai lintas halaman (favorit, profil, riwayat chat AI)
dan menyinkronkannya ke local storage supaya data tetap ada saat app dibuka lagi.
"""
import flet as ft
from services.storage import LocalStorage


class AppState:
    def __init__(self, page: ft.Page):
        self.page = page
        self.storage = LocalStorage(page)

        self.favorites: list[str] = self.storage.get_favorites()
        self.profile: dict = self.storage.get_profile()
        self.chat_history: list[dict] = []  # {"role": "user"/"ai", "text": str}

        # dipanggil setelah favorit berubah supaya UI lain (halaman Favorit) refresh
        self.on_favorites_changed = []

    # ---------------- Favorites ----------------
    def is_favorite(self, product_id: str) -> bool:
        return product_id in self.favorites

    def toggle_favorite(self, product_id: str):
        self.favorites = self.storage.toggle_favorite(product_id)
        for callback in self.on_favorites_changed:
            callback()

    # ---------------- Profile ----------------
    def update_profile(self, new_data: dict):
        self.profile.update(new_data)
        self.storage.save_profile(self.profile)
