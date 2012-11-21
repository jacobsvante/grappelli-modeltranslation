import os.path
from django.conf import settings
from modeltranslation.admin import (
    TranslationAdmin as TranslationAdminBase,
    TranslationTabularInline as TranslationTabularInlineBase,
    TranslationStackedInline as TranslationStackedInlineBase,
    TranslationGenericTabularInline as TranslationGenericTabularInlineBase,
    TranslationGenericStackedInline as TranslationGenericStackedInlineBase,
)


def get_media_file_path(rel_path):
    return os.path.join(settings.STATIC_URL,
                        'grappelli_modeltranslation',
                        rel_path)


MODEL_TRANSLATION_JS = (get_media_file_path(
                                'js/tabbed_translation_fields.js'), )
MODEL_TRANSLATION_CSS = {'screen': (get_media_file_path(
                                    'css/tabbed_translation_fields.css'), )}


class TranslationAdmin(TranslationAdminBase):

    class Media:
        js = MODEL_TRANSLATION_JS
        css = MODEL_TRANSLATION_CSS


class TranslationTabularInline(TranslationTabularInlineBase):

    class Media:
        js = MODEL_TRANSLATION_JS
        css = MODEL_TRANSLATION_CSS


class TranslationStackedInline(TranslationStackedInlineBase):

    class Media:
        js = MODEL_TRANSLATION_JS
        css = MODEL_TRANSLATION_CSS


class TranslationGenericTabularInline(TranslationGenericTabularInlineBase):

    class Media:
        js = MODEL_TRANSLATION_JS
        css = MODEL_TRANSLATION_CSS


class TranslationGenericStackedInline(TranslationGenericStackedInlineBase):

    class Media:
        js = MODEL_TRANSLATION_JS
        css = MODEL_TRANSLATION_CSS
