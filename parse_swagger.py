import json

with open('swagger-spec.json', 'r') as f:
    spec = json.load(f)

print("# Backend API Endpoints")
paths = spec.get('paths', {})
for path, methods in paths.items():
    for method, details in methods.items():
        summary = details.get('summary', '')
        tags = details.get('tags', [])
        print(f"## {method.upper()} {path} - {summary} {tags}")
        
        # Params
        params = details.get('parameters', [])
        if params:
            print("  - Parameters:")
            for p in params:
                req = "required" if p.get("required") else "optional"
                print(f"    - {p.get('name')} ({p.get('in')}): {req}")
        
        # Request Body
        body = details.get('requestBody', {})
        if body:
            content = body.get('content', {})
            for content_type, ct_details in content.items():
                schema = ct_details.get('schema', {})
                ref = schema.get('$ref', '')
                if not ref and 'items' in schema:
                    ref = schema.get('items', {}).get('$ref', '')
                ref_name = ref.split('/')[-1] if ref else 'Inline Schema'
                print(f"  - Request Body: {content_type} ({ref_name})")
        print()
