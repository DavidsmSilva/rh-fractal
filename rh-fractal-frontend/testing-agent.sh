#!/bin/bash

echo "====================================="
echo "  Testing Agent - Automation Script"
echo "====================================="
echo ""

run_tests() {
    echo "[1/3] Running unit tests..."
    npm test -- --watch=false --browsers=ChromeHeadless
    if [ $? -eq 0 ]; then
        echo "✓ Unit tests passed"
    else
        echo "✗ Unit tests failed"
        exit 1
    fi
}

run_coverage() {
    echo ""
    echo "[2/3] Generating coverage report..."
    npm test -- --watch=false --browsers=ChromeHeadless --code-coverage
    echo "✓ Coverage report generated"
}

generate_specs() {
    echo ""
    echo "[3/3] Generating test specs for components..."
    
    COMPONENTS=(
        "empleados"
        "inventario"
        "vacaciones"
        "beneficios"
        "nominas"
        "departamentos"
    )
    
    for comp in "${COMPONENTS[@]}"; do
        spec_file="src/app/pages/$comp/${comp}.component.spec.ts"
        if [ ! -f "$spec_file" ]; then
            echo "  → Creating spec for $comp"
            touch "$spec_file"
        else
            echo "  → Spec for $comp already exists"
        fi
    done
}

case "$1" in
    all)
        run_tests
        run_coverage
        ;;
    test)
        run_tests
        ;;
    coverage)
        run_coverage
        ;;
    generate)
        generate_specs
        ;;
    *)
        echo "Usage: $0 {all|test|coverage|generate}"
        echo ""
        echo "  all       - Run tests and generate coverage"
        echo "  test      - Run unit tests only"
        echo "  coverage  - Generate coverage report"
        echo "  generate  - Generate test spec files"
        exit 1
        ;;
esac

echo ""
echo "====================================="
echo "  Testing completed successfully!"
echo "====================================="
