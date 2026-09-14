import json
with open('swagger-spec.json', 'r') as f:
    spec = json.load(f)

print("# DTOs")
schemas = spec.get('components', {}).get('schemas', {})
for name, schema in schemas.items():
    print(f"## {name}")
    props = schema.get('properties', {})
    required = schema.get('required', [])
    for p_name, p_details in props.items():
        req = "*" if p_name in required else ""
        type_str = p_details.get('type', p_details.get('$ref', 'any'))
        print(f"  - {p_name}{req}: {type_str}")
