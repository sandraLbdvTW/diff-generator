<a href="https://codeclimate.com/github/sandraLbdv/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/d9309cd8c7addf6c635d/maintainability" /></a> <a href="https://codeclimate.com/github/sandraLbdv/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d9309cd8c7addf6c635d/test_coverage" /></a>
![](https://github.com/sandraLbdv/frontend-project-lvl2/workflows/Node/badge.svg)

# Вычислитель отличий

Вычислитель отличий – консольная утилита, определяющая разницу между двумя структурами данных. 

Возможности программы:

   - Поддержка разных входных форматов: yaml, json, ini
   - Генерация отчета в виде plain text, tree и json

### Как использовать?

#### Сравнение файлов
Для сравнения данных используется команда `gendiff -f <firstConfig> <secondConfig>`, где:
- `-f, --format [type]` - формат вывода:
   - `tree` - формат по умолчанию
   - `plain`
   - `json`
- `<firstConfig>`- путь к первому файлу
- `<secondConfig>` - путь ко второму файлу

#### Вывод справки
Для вывода справочной информации используйте команду `gendiff -h`:
```
$ gendiff -h
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "tree")
  -h, --help           display help for command
 ```

### Примеры использования

#### Вывод сравнения данных .ini-файлов в формате `tree`
```
$ gendiff ./__fixtures__/before.ini ./__fixtures__/after.ini -f tree
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
```

#### Вывод сравнения данных .json-файлов в формате `plain`
```
$ gendiff ./__fixtures__/before.json ./__fixtures__/after.json -f plain
Property 'common.follow' was added with value: false
Property 'common.setting2' was deleted
Property 'common.setting3' was changed from true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]
```

#### Вывод сравнения данных .yml-файлов в формате `json`
```
$ gendiff ./__fixtures__/before.yml ./__fixtures__/after.yml -f json
[{"name":"common","status":"hasChildren","children":[{"name":"follow","status":"added","valueNew":false},{"name":"setting1","status":"unmodified","valueOld":"Value 1","valueNew":"Value 1"},{"name":"setting2","status":"deleted","valueOld":"200"},{"name":"setting3","status":"modified","valueOld":true,"valueNew":{"key":"value"}},{"name":"setting4","status":"added","valueNew":"blah blah"},{"name":"setting5","status":"added","valueNew":{"key5":"value5"}},{"name":"setting6","status":"hasChildren","children":[{"name":"key","status":"unmodified","valueOld":"value","valueNew":"value"},{"name":"ops","status":"added","valueNew":"vops"}]}]},{"name":"group1","status":"hasChildren","children":[{"name":"baz","status":"modified","valueOld":"bas","valueNew":"bars"},{"name":"foo","status":"unmodified","valueOld":"bar","valueNew":"bar"},{"name":"nest","status":"modified","valueOld":{"key":"value"},"valueNew":"str"}]},{"name":"group2","status":"deleted","valueOld":{"abc":"12345"}},{"name":"group3","status":"added","valueNew":{"fee":"100500"}}]
```
