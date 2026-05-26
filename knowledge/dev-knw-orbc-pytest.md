---
id: 7e2b1a0c-3d4e-5f6a-7b8c-9d0e1f2a3b4c
tags:
  - "#orbc/knowledge"
  - "#orbc/verification"
  - "#orbc/knowledge/python"
status: current
---

# Pytest Setup

How to set up pytest for Python projects.

## Prerequisites

- Python >= 3.10
- Virtual environment active (venv, poetry, or uv)

## Installation

**With pip:**
```bash
pip install pytest pytest-cov pytest-asyncio
```

**With uv:**
```bash
uv add --dev pytest pytest-cov pytest-asyncio
```

**With poetry:**
```bash
poetry add --group dev pytest pytest-cov pytest-asyncio
```

## Configuration

Add to `pyproject.toml`:

```toml
[tool.pytest.ini_options]
testpaths = ["tests", "src"]
python_files = ["test_*.py", "*_test.py"]
python_functions = ["test_*"]
addopts = "-v --tb=short"
asyncio_mode = "auto"
markers = [
    "slow: marks tests as slow",
    "integration: marks tests as integration tests",
]

[tool.coverage.run]
source = ["src"]
omit = ["**/test_*.py", "**/*_test.py", "**/conftest.py"]

[tool.coverage.report]
show_missing = true
exclude_lines = [
    "pragma: no cover",
    "if TYPE_CHECKING:",
]
```

## Directory Structure

```
project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       ├── feature.py
│       └── test_feature.py    # Co-located tests (optional)
├── tests/
│   ├── conftest.py            # Shared fixtures
│   ├── fixtures/              # Test data files
│   │   └── sample_data.json
│   ├── unit/
│   │   └── test_feature.py
│   └── integration/
│       └── test_api.py
├── pyproject.toml
└── setup.py (or pyproject.toml with build config)
```

## Shared Fixtures (conftest.py)

```python
# tests/conftest.py
import pytest
from pathlib import Path

@pytest.fixture
def fixtures_dir() -> Path:
    """Path to fixtures directory."""
    return Path(__file__).parent / "fixtures"

@pytest.fixture
def sample_data():
    """Sample test data."""
    return {"key": "value", "items": [1, 2, 3]}

@pytest.fixture
async def async_client():
    """Async HTTP client for integration tests."""
    import httpx
    async with httpx.AsyncClient() as client:
        yield client

@pytest.fixture(scope="session")
def database():
    """Database connection for entire test session."""
    db = setup_test_database()
    yield db
    db.close()
```

## Writing Tests

```python
# tests/unit/test_feature.py
import pytest
from mypackage.feature import my_function, MyClass

class TestMyFunction:
    def test_valid_input(self):
        result = my_function("input")
        assert result == "expected"

    def test_invalid_input(self):
        with pytest.raises(ValueError, match="Invalid"):
            my_function(None)

    @pytest.mark.parametrize("input,expected", [
        ("a", "A"),
        ("b", "B"),
        ("", ""),
    ])
    def test_multiple_cases(self, input, expected):
        assert my_function(input) == expected


class TestMyClass:
    @pytest.fixture
    def instance(self):
        return MyClass(config={"debug": True})

    def test_method(self, instance):
        assert instance.method() == "result"

    def test_with_sample_data(self, instance, sample_data):
        # Uses fixture from conftest.py
        result = instance.process(sample_data)
        assert "key" in result
```

## Async Tests

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
    result = await async_fetch_data()
    assert result["status"] == "ok"

# Or use class-based
class TestAsyncFeature:
    @pytest.mark.asyncio
    async def test_fetch(self, async_client):
        response = await async_client.get("https://api.example.com")
        assert response.status_code == 200
```

## Mocking

```python
from unittest.mock import Mock, patch, AsyncMock

def test_with_mock():
    mock_dep = Mock()
    mock_dep.fetch.return_value = {"data": "mocked"}

    result = function_under_test(mock_dep)

    mock_dep.fetch.assert_called_once()
    assert result == "expected"

@patch("mypackage.feature.external_api")
def test_with_patch(mock_api):
    mock_api.call.return_value = "mocked"
    result = function_that_calls_api()
    assert result == "processed mocked"

@pytest.mark.asyncio
async def test_async_mock():
    mock_client = AsyncMock()
    mock_client.fetch.return_value = {"data": "async mocked"}

    result = await async_function(mock_client)
    assert result == "expected"
```

## Running Tests

| Command | Purpose |
|---------|---------|
| `pytest` | Run all tests |
| `pytest -v` | Verbose output |
| `pytest tests/unit/` | Run specific directory |
| `pytest tests/unit/test_feature.py` | Run specific file |
| `pytest -k "valid"` | Run tests matching name |
| `pytest -m slow` | Run tests with marker |
| `pytest --cov=src` | With coverage |
| `pytest --cov=src --cov-report=html` | Coverage HTML report |
| `pytest -x` | Stop on first failure |
| `pytest --lf` | Run last failed tests |

## Verification

After setup, run:
```bash
pytest
```

Expected output:
```
============================= test session starts ==============================
collected 5 items

tests/unit/test_feature.py::TestMyFunction::test_valid_input PASSED      [ 20%]
tests/unit/test_feature.py::TestMyFunction::test_invalid_input PASSED    [ 40%]
tests/unit/test_feature.py::TestMyFunction::test_multiple_cases[a-A] PASSED [ 60%]
tests/unit/test_feature.py::TestMyFunction::test_multiple_cases[b-B] PASSED [ 80%]
tests/unit/test_feature.py::TestMyFunction::test_multiple_cases[-] PASSED [100%]

============================== 5 passed in 0.03s ===============================
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `ModuleNotFoundError` | Run `pip install -e .` to install package in dev mode |
| Fixtures not found | Ensure `conftest.py` is in `tests/` directory |
| Async tests skip | Install `pytest-asyncio`, add `asyncio_mode = "auto"` |
| Import errors | Check `__init__.py` files exist in packages |
| Slow tests | Use `pytest -x --ff` to fail fast and run failures first |
