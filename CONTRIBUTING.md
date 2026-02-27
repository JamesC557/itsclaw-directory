# Contributing to itsclaw-directory

Thanks for contributing!

## Add a new tool

1. Fork the repo.
2. Add a YAML file to `content/tools/` (copy `content/templates/tool.yml`).
3. Run locally:
   - `npm i`
   - `npm run validate:tools`
   - `npm run build`
4. Open a PR.

## Requirements

- A short, accurate `one_liner`.
- `status` set correctly.
- Add a repo link when possible.
- Prefer stable slugs: lowercase, numbers, dashes.

## Notes

This directory is curated. Entries may be edited for clarity/consistency.
