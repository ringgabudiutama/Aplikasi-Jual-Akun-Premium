"""
Rifora Premium — Entry Point.
Mengatur setup halaman (font, tema, warna status bar), state global, dan
routing antar halaman (Splash -> Dashboard/Produk/AI/Favorit/Profil <-> Detail Produk).
Tanpa backend/API — 100% Python + Flet, data lokal di client_storage.
"""
import flet as ft

from theme.colors import AppColors, FONT_FAMILY, GOOGLE_FONTS
from state.app_state import AppState

from pages.splash import build_splash
from pages.dashboard import build_dashboard
from pages.products import build_products_page
from pages.product_detail import build_product_detail
from pages.ai_assistant import build_ai_assistant_page
from pages.favorites import build_favorites_page
from pages.profile import build_profile_page
from components.bottom_nav import build_bottom_nav

TAB_DASHBOARD, TAB_PRODUCTS, TAB_AI, TAB_FAVORITES, TAB_PROFILE = range(5)


def main(page: ft.Page):
    # ---------------- Konfigurasi halaman ----------------
    page.title = "Rifora Premium"
    page.fonts = GOOGLE_FONTS
    page.theme = ft.Theme(font_family=FONT_FAMILY, color_scheme_seed=AppColors.PRIMARY)
    page.bgcolor = AppColors.BACKGROUND
    page.padding = 0
    page.scroll = None
    # Ukuran jendela — coba API baru (page.window.*) lalu fallback ke API lama
    # (page.window_*) supaya kompatibel dengan berbagai versi Flet.
    try:
        page.window.width = 420
        page.window.height = 860
        page.window.min_width = 360
    except AttributeError:
        page.window_width = 420
        page.window_height = 860
        page.window_min_width = 360

    state = AppState(page)

    # ---------------- Router sederhana ----------------
    nav_state = {"tab": TAB_DASHBOARD, "screen": "splash", "selected_product": None, "pending_query": None, "pending_category": None}

    content_area = ft.Container(expand=True)
    bottom_nav_area = ft.Container(visible=False)

    root_column = ft.Column(expand=True, spacing=0, controls=[content_area, bottom_nav_area])

    def go_to_product(product: dict):
        nav_state["screen"] = "product_detail"
        nav_state["selected_product"] = product
        render()

    def back_from_product():
        nav_state["screen"] = "tab"
        render()

    def go_to_products_tab(query=None, category=None):
        nav_state["tab"] = TAB_PRODUCTS
        nav_state["screen"] = "tab"
        nav_state["pending_query"] = query
        nav_state["pending_category"] = category
        render()

    def go_to_ai_tab():
        nav_state["tab"] = TAB_AI
        nav_state["screen"] = "tab"
        render()

    def switch_tab(index: int):
        nav_state["tab"] = index
        nav_state["screen"] = "tab"
        render()

    def do_logout():
        # Tidak ada sesi server — logout hanya reset tampilan kembali ke Dashboard.
        nav_state["tab"] = TAB_DASHBOARD
        nav_state["screen"] = "tab"
        page.open(ft.SnackBar(ft.Text("Berhasil logout."), bgcolor=AppColors.SUCCESS))
        render()

    def finish_splash():
        nav_state["screen"] = "tab"
        render()

    def build_tab_content():
        tab = nav_state["tab"]
        if tab == TAB_DASHBOARD:
            return build_dashboard(page, state, go_to_product, go_to_products_tab, go_to_ai_tab)
        if tab == TAB_PRODUCTS:
            q = nav_state.pop("pending_query", None)
            cat = nav_state.pop("pending_category", None)
            return build_products_page(page, state, go_to_product, initial_category=cat, initial_query=q)
        if tab == TAB_AI:
            return build_ai_assistant_page(page, state)
        if tab == TAB_FAVORITES:
            return build_favorites_page(page, state, go_to_product)
        if tab == TAB_PROFILE:
            return build_profile_page(page, state, do_logout)
        return ft.Container()

    def render():
        if nav_state["screen"] == "splash":
            content_area.content = build_splash(finish_splash)
            bottom_nav_area.visible = False
        elif nav_state["screen"] == "product_detail":
            content_area.content = build_product_detail(page, state, nav_state["selected_product"], back_from_product)
            bottom_nav_area.visible = False
        else:
            content_area.content = build_tab_content()
            bottom_nav_area.content = build_bottom_nav(nav_state["tab"], switch_tab)
            bottom_nav_area.visible = True
        page.update()

    page.add(root_column)
    render()


if __name__ == "__main__":
    ft.app(target=main)
