from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]

SOURCE = (
    ROOT
    / "public"
    / "images"
    / "branding"
    / "afd-white.png"
)

OUTPUT = (
    ROOT
    / "app"
    / "icon.png"
)


def main():
    image = Image.open(
        SOURCE
    ).convert("RGBA")

    alpha = image.getchannel(
        "A"
    )

    bbox = alpha.getbbox()

    if bbox is None:
        raise RuntimeError(
            "The logo image appears to be fully transparent."
        )

    cropped = image.crop(
        bbox
    )

    width, height = (
        cropped.size
    )

    largest_side = max(
        width,
        height
    )

    padding = int(
        largest_side * 0.08
    )

    canvas_size = (
        largest_side
        + padding * 2
    )

    canvas = Image.new(
        "RGBA",
        (
            canvas_size,
            canvas_size,
        ),
        (
            0,
            0,
            0,
            0,
        ),
    )

    x = (
        canvas_size
        - width
    ) // 2

    y = (
        canvas_size
        - height
    ) // 2

    canvas.paste(
        cropped,
        (
            x,
            y,
        ),
        cropped,
    )

    canvas = canvas.resize(
        (
            512,
            512,
        ),
        Image.Resampling.LANCZOS,
    )

    OUTPUT.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    canvas.save(
        OUTPUT,
        "PNG",
        optimize=True,
    )

    print(
        f"Favicon created: {OUTPUT}"
    )


if __name__ == "__main__":
    main()