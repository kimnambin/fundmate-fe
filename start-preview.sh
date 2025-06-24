for dir in apps/*; do
  name=$(basename "$dir")
  if [ "$name" != "main" ] && [ -f "$dir/package.json" ]; then
    echo "▶️ Starting preview in $name..."
    (cd "$dir" && npm run build && npm run preview &)
  fi
done

wait
echo "✅ All previews started (excluding 'main')."
