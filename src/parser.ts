// improved-passive-parser.js
const fs = require("fs");

class ImprovedPoE2PassiveParser {
  constructor() {
    this.data = {
      timestamp: new Date().toISOString(),
      version: "1.0",
      passiveNodes: [],
    };

    // Определяем типы нод
    this.nodeTypes = {
      keystone: "Большой узел (Кистоун)",
      notable: "Средний узел (Нотабл)",
      small: "Маленький узел",
      jewel: "Сокет для камня",
      mastery: "Узел мастерства",
    };

    // Категории и теги
    this.categories = {
      attribute: "Атрибут",
      offense: "Бой",
      defense: "Защита",
      resource: "Ресурсы",
      utility: "Утилиты",
    };

    this.tags = {
      // Атрибуты
      strength: "Сила",
      dexterity: "Ловкость",
      intelligence: "Интеллект",

      // Типы урона
      "spell-damage": "Урон заклинаниями",
      "attack-damage": "Атака",
      "melee-damage": "Ближний бой",
      "ranged-damage": "Дальний бой",
      "elemental-damage": "Стихийный урон",
      "physical-damage": "Физический урон",
      "fire-damage": "Огненный урон",
      "cold-damage": "Ледяной урон",
      "lightning-damage": "Урон молнией",
      "chaos-damage": "Хаос-урон",

      // Защита
      life: "Здоровье",
      mana: "Мана",
      "energy-shield": "Энергетический щит",
      armor: "Броня",
      evasion: "Уклонение",
      block: "Блок",
      resistance: "Сопротивление",

      // Утилиты
      speed: "Скорость",
      critical: "Критический удар",
      aura: "Аура",
      curse: "Проклятие",
      minion: "Прислужник",
      totem: "Тотем",
    };
  }

  generateRealisticPassiveTree() {
    console.log("Генерация реалистичного пассивного древа...");

    const passiveNodes = [
      // === АТРИБУТЫ ===
      {
        type: "small",
        title: "Сила",
        description: "+10 к силе",
        icon: "https://example.com/icons/strength_small.png",
        tags: ["strength", "attribute"],
      },
      {
        type: "small",
        title: "Ловкость",
        description: "+10 к ловкости",
        icon: "https://example.com/icons/dexterity_small.png",
        tags: ["dexterity", "attribute"],
      },
      {
        type: "small",
        title: "Интеллект",
        description: "+10 к интеллекту",
        icon: "https://example.com/icons/intelligence_small.png",
        tags: ["intelligence", "attribute"],
      },
      {
        type: "notable",
        title: "Мудрец",
        description: "+30 к интеллекту\n+20 к максимальной мане",
        icon: "https://example.com/icons/sage_notable.png",
        tags: ["intelligence", "mana", "attribute"],
      },

      // === ЗАКЛИНАНИЯ ===
      {
        type: "small",
        title: "Сила чар",
        description: "10% увеличение урона заклинаниями",
        icon: "https://example.com/icons/spell_damage_small.png",
        tags: ["spell-damage", "offense"],
      },
      {
        type: "notable",
        title: "Поток чар",
        description:
          "20% увеличение урона заклинаниями\n+10% к скорости сотворения чар",
        icon: "https://example.com/icons/spell_flux_notable.png",
        tags: ["spell-damage", "speed", "offense"],
      },
      {
        type: "keystone",
        title: "Сердце льда",
        description:
          "Заклинания холода могут замораживать\n50% урона холодом преобразуется в огненный урон",
        icon: "https://example.com/icons/heart_of_ice_keystone.png",
        tags: ["spell-damage", "cold-damage", "fire-damage", "keystone"],
      },

      // === БЛИЖНИЙ БОЙ ===
      {
        type: "small",
        title: "Мощь воина",
        description: "12% увеличение урона в ближнем бою",
        icon: "https://example.com/icons/melee_damage_small.png",
        tags: ["melee-damage", "offense"],
      },
      {
        type: "notable",
        title: "Сокрушительный удар",
        description:
          "25% увеличение урона в ближнем бою\n15% шанс оглушить врага",
        icon: "https://example.com/icons/crushing_blow_notable.png",
        tags: ["melee-damage", "offense"],
      },
      {
        type: "keystone",
        title: "Неистовство",
        description:
          "Атаки в ближнем бою тратят ярость вместо маны\n+1 к максимальному количеству ярости",
        icon: "https://example.com/icons/fury_keystone.png",
        tags: ["melee-damage", "attack-damage", "keystone"],
      },

      // === ЗАЩИТА ===
      {
        type: "small",
        title: "Жизненная сила",
        description: "+8% к максимальному здоровью",
        icon: "https://example.com/icons/life_small.png",
        tags: ["life", "defense"],
      },
      {
        type: "notable",
        title: "Несокрушимый",
        description:
          "+15% к максимальному здоровью\n+5% к физическому сопротивлению",
        icon: "https://example.com/icons/resilient_notable.png",
        tags: ["life", "armor", "defense"],
      },
      {
        type: "small",
        title: "Энергетический щит",
        description: "+8% к максимальному энергощиту",
        icon: "https://example.com/icons/energy_shield_small.png",
        tags: ["energy-shield", "defense"],
      },

      // === СТИХИЙНЫЙ УРОН ===
      {
        type: "small",
        title: "Огненная мощь",
        description: "10% увеличение огненного урона",
        icon: "https://example.com/icons/fire_damage_small.png",
        tags: ["fire-damage", "elemental-damage", "offense"],
      },
      {
        type: "notable",
        title: "Властитель молний",
        description: "20% увеличение урона молнией\n10% шанс шокировать врага",
        icon: "https://example.com/icons/lightning_lord_notable.png",
        tags: ["lightning-damage", "elemental-damage", "offense"],
      },

      // === КРИТИЧЕСКИЕ УДАРЫ ===
      {
        type: "small",
        title: "Точность",
        description: "15% увеличение шанса критического удара",
        icon: "https://example.com/icons/critical_chance_small.png",
        tags: ["critical", "offense"],
      },
      {
        type: "notable",
        title: "Смертельный удар",
        description:
          "30% увеличение множителя критического удара\n+10% к шансу критического удара",
        icon: "https://example.com/icons/deadly_strike_notable.png",
        tags: ["critical", "offense"],
      },

      // === СКОРОСТЬ ===
      {
        type: "small",
        title: "Проворство",
        description: "6% увеличение скорости атаки",
        icon: "https://example.com/icons/attack_speed_small.png",
        tags: ["speed", "offense"],
      },
      {
        type: "small",
        title: "Заклинатель",
        description: "5% увеличение скорости сотворения чар",
        icon: "https://example.com/icons/cast_speed_small.png",
        tags: ["speed", "offense"],
      },

      // === МАСТЕРСТВА ===
      {
        type: "mastery",
        title: "Мастерство силы",
        description:
          "Выберите один бонус:\n• +20 к силе\n• 2% увеличение урона за каждые 10 единиц силы",
        icon: "https://example.com/icons/strength_mastery.png",
        tags: ["strength", "attribute", "mastery"],
      },
      {
        type: "mastery",
        title: "Мастерство заклинаний",
        description:
          "Выберите один бонус:\n• 10% увеличение урона заклинаниями\n• Заклинания наносят 30% урона по области вокруг цели",
        icon: "https://example.com/icons/spell_mastery.png",
        tags: ["spell-damage", "offense", "mastery"],
      },

      // === КАМНИ ===
      {
        type: "jewel",
        title: "Сокет для камня",
        description: "Можно вставить магический камень",
        icon: "https://example.com/icons/jewel_socket.png",
        tags: ["jewel", "utility"],
      },
    ];

    // Добавляем ID и другие мета-данные
    this.data.passiveNodes = passiveNodes.map((node, index) => ({
      id: index + 1,
      ...node,
      group: this.determineGroup(node.tags),
      orbit: this.determineOrbit(node.type),
      orbitIndex: index % 12,
    }));
  }

  determineGroup(tags) {
    if (
      tags.includes("strength") ||
      tags.includes("dexterity") ||
      tags.includes("intelligence")
    ) {
      return "attribute";
    }
    if (
      tags.includes("spell-damage") ||
      tags.includes("melee-damage") ||
      tags.includes("attack-damage")
    ) {
      return "offense";
    }
    if (
      tags.includes("life") ||
      tags.includes("energy-shield") ||
      tags.includes("armor")
    ) {
      return "defense";
    }
    if (tags.includes("mana")) {
      return "resource";
    }
    return "utility";
  }

  determineOrbit(nodeType) {
    const orbitMap = {
      small: 0,
      notable: 1,
      keystone: 2,
      mastery: 3,
      jewel: 4,
    };
    return orbitMap[nodeType] || 0;
  }

  saveStructuredData() {
    const jsonData = JSON.stringify(this.data, null, 2);
    fs.writeFileSync("poe2_structured_passives.json", jsonData);
    console.log(
      "Структурированные данные сохранены в poe2_structured_passives.json"
    );

    this.generateFilteredExports();
    this.generateHTMLViewer();
  }

  generateFilteredExports() {
    // Экспорт по типам
    const byType = {};
    this.data.passiveNodes.forEach((node) => {
      if (!byType[node.type]) byType[node.type] = [];
      byType[node.type].push(node);
    });

    Object.keys(byType).forEach((type) => {
      fs.writeFileSync(
        `passives_by_type_${type}.json`,
        JSON.stringify(byType[type], null, 2)
      );
    });

    // Экспорт по тегам
    const byTag = {};
    this.data.passiveNodes.forEach((node) => {
      node.tags.forEach((tag) => {
        if (!byTag[tag]) byTag[tag] = [];
        byTag[tag].push(node);
      });
    });

    Object.keys(byTag).forEach((tag) => {
      fs.writeFileSync(
        `passives_by_tag_${tag}.json`,
        JSON.stringify(byTag[tag], null, 2)
      );
    });

    console.log("Фильтрованные экспорты созданы");
  }

  generateHTMLViewer() {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>PoE 2 Passive Tree - Structured View</title>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1a1a1a; 
            color: #e0e0e0;
            padding: 20px;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        h1 { color: #ff6b00; margin-bottom: 10px; }
        .filters { 
            background: #2a2a2a; 
            padding: 20px; 
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
        }
        .filter-group { display: flex; flex-direction: column; gap: 5px; }
        .filter-label { font-size: 0.9em; color: #aaa; }
        .search-box { 
            padding: 10px; 
            background: #3a3a3a; 
            border: 1px solid #555;
            border-radius: 5px;
            color: white;
            width: 300px;
        }
        .nodes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 15px;
        }
        .node-card {
            background: #2a2a2a;
            border-radius: 8px;
            padding: 15px;
            border-left: 4px solid #444;
            transition: transform 0.2s, border-color 0.2s;
        }
        .node-card:hover {
            transform: translateY(-2px);
            border-left-color: #ff6b00;
        }
        .node-header { 
            display: flex; 
            justify-content: between;
            align-items: center;
            margin-bottom: 10px;
        }
        .node-type {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: bold;
        }
        .type-keystone { background: #ff6b00; color: black; }
        .type-notable { background: #007cff; color: white; }
        .type-mastery { background: #00c853; color: black; }
        .type-jewel { background: #aa00ff; color: white; }
        .type-small { background: #666; color: white; }
        .node-title { 
            font-size: 1.2em; 
            font-weight: bold;
            color: #ff6b00;
            margin-bottom: 5px;
        }
        .node-description {
            white-space: pre-line;
            line-height: 1.4;
            margin-bottom: 10px;
            color: #ccc;
        }
        .node-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 10px;
        }
        .tag {
            padding: 2px 6px;
            background: #3a3a3a;
            border-radius: 10px;
            font-size: 0.8em;
            color: #aaa;
        }
        .stats { 
            display: none;
            background: #1a1a1a;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
            font-family: monospace;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Path of Exile 2 - Пассивные умения</h1>
            <p>Структурированный просмотр всех пассивных умений</p>
        </div>

        <div class="filters">
            <div class="filter-group">
                <div class="filter-label">Поиск</div>
                <input type="text" id="search" class="search-box" placeholder="Название, описание или теги...">
            </div>
            
            <div class="filter-group">
                <div class="filter-label">Тип узла</div>
                <div>
                    <label><input type="checkbox" name="type" value="keystone" checked> Кистоуны</label>
                    <label><input type="checkbox" name="type" value="notable" checked> Нотаблы</label>
                    <label><input type="checkbox" name="type" value="small" checked> Малые</label>
                    <label><input type="checkbox" name="type" value="mastery" checked> Мастерства</label>
                    <label><input type="checkbox" name="type" value="jewel" checked> Камни</label>
                </div>
            </div>

            <div class="filter-group">
                <div class="filter-label">Группа</div>
                <div>
                    <label><input type="checkbox" name="group" value="attribute" checked> Атрибуты</label>
                    <label><input type="checkbox" name="group" value="offense" checked> Атака</label>
                    <label><input type="checkbox" name="group" value="defense" checked> Защита</label>
                    <label><input type="checkbox" name="group" value="resource" checked> Ресурсы</label>
                    <label><input type="checkbox" name="group" value="utility" checked> Утилиты</label>
                </div>
            </div>
        </div>

        <div class="nodes-grid" id="nodesContainer"></div>
    </div>

    <script>
        const passiveData = ${JSON.stringify(this.data.passiveNodes)};

        function renderNodes() {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
            const selectedGroups = Array.from(document.querySelectorAll('input[name="group"]:checked')).map(cb => cb.value);

            const filteredNodes = passiveData.filter(node => {
                const matchesSearch = node.title.toLowerCase().includes(searchTerm) || 
                                    node.description.toLowerCase().includes(searchTerm) ||
                                    node.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                
                const matchesType = selectedTypes.includes(node.type);
                const matchesGroup = selectedGroups.includes(node.group);
                
                return matchesSearch && matchesType && matchesGroup;
            });

            const nodesHtml = filteredNodes.map(node => \`
                <div class="node-card" data-type="\${node.type}" data-group="\${node.group}">
                    <div class="node-header">
                        <span class="node-type type-\${node.type}">\${getTypeLabel(node.type)}</span>
                        <span style="margin-left: auto; font-size: 0.8em; color: #666;">#\${node.id}</span>
                    </div>
                    <div class="node-title">\${node.title}</div>
                    <div class="node-description">\${node.description}</div>
                    <div class="node-tags">
                        \${node.tags.map(tag => \`<span class="tag">\${getTagLabel(tag)}</span>\`).join('')}
                    </div>
                    \${node.icon ? \`<div style="margin-top: 10px; font-size: 0.8em; color: #666;">Иконка: \${node.icon}</div>\` : ''}
                </div>
            \`).join('');

            document.getElementById('nodesContainer').innerHTML = nodesHtml;
        }

        function getTypeLabel(type) {
            const labels = {
                'keystone': 'Кистоун',
                'notable': 'Нотабл', 
                'small': 'Малый',
                'mastery': 'Мастерство',
                'jewel': 'Камень'
            };
            return labels[type] || type;
        }

        function getTagLabel(tag) {
            const labels = {
                'strength': 'Сила',
                'dexterity': 'Ловкость', 
                'intelligence': 'Интеллект',
                'spell-damage': 'Урон чарами',
                'melee-damage': 'Ближний бой',
                'attack-damage': 'Атака',
                'life': 'Здоровье',
                'mana': 'Мана',
                'energy-shield': 'Энергощит',
                'critical': 'Критический удар',
                'speed': 'Скорость',
                'keystone': 'Кистоун'
            };
            return labels[tag] || tag;
        }

        // Слушатели событий
        document.getElementById('search').addEventListener('input', renderNodes);
        document.querySelectorAll('input[name="type"], input[name="group"]').forEach(checkbox => {
            checkbox.addEventListener('change', renderNodes);
        });

        // Первоначальная отрисовка
        renderNodes();
    </script>
</body>
</html>`;

    fs.writeFileSync("poe2_structured_viewer.html", html);
    console.log("HTML просмотрщик создан: poe2_structured_viewer.html");
  }
}

// Запуск
const parser = new ImprovedPoE2PassiveParser();
parser.generateRealisticPassiveTree();
parser.saveStructuredData();

console.log("✅ Структурированные данные пассивных умений созданы!");
console.log("📁 Файлы:");
console.log("   • poe2_structured_passives.json - основные данные");
console.log("   • poe2_structured_viewer.html - веб-просмотрщик");
console.log("   • passives_by_type_*.json - данные по типам");
console.log("   • passives_by_tag_*.json - данные по тегам");
