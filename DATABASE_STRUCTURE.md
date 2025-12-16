# 📊 MongoDB Database Structure - Joshua's Portfolio

Esta documentación describe la estructura completa y organizada de la base de datos MongoDB para tu portfolio.

## 🗂️ Colecciones (Collections)

### 1. **Profile** - Información Personal Principal
**Propósito**: Almacena toda tu información personal y profesional básica

**Campos**:
```javascript
{
  fullName: "Joshua Jiménez",
  title: "Software Developer",
  bio: "Descripción profesional completa",
  location: {
    city: "San José",
    country: "Costa Rica",
    full: "San José, Costa Rica"
  },
  contact: {
    email: "jjl1089@gmail.com",
    phone: "+506 7284-8846"
  },
  socialMedia: {
    github: "https://github.com/JoshKerosh",
    linkedin: "https://www.linkedin.com/in/joshuajl/",
    twitter: "",
    portfolio: ""
  },
  availability: {
    status: "available | not-available | limited",
    openTo: ["freelance", "full-time", "consulting"]
  },
  stats: {
    yearsExperience: 1.5,
    projectsCompleted: 12,
    clientsServed: 5
  },
  created_at: Date,
  updated_at: Date
}
```

---

### 2. **Experience** - Experiencia Laboral
**Propósito**: Historial completo de experiencia profesional

**Campos**:
```javascript
{
  title: "Data Analyst",
  company: "Nombre de la empresa",
  location: "San José, Costa Rica",
  employmentType: "full-time | part-time | contract | freelance | internship",
  startDate: Date,
  endDate: Date,  // null si es trabajo actual
  current: false,
  duration: "6 months",
  description: "Descripción general del rol",
  responsibilities: [
    "Responsabilidad 1",
    "Responsabilidad 2"
  ],
  achievements: [
    "Logro 1",
    "Logro 2"
  ],
  technologies: ["C#", "SQL", "Python"],
  order: 1,  // Para ordenar manualmente
  created_at: Date
}
```

**Índices**:
- `startDate: -1` (más reciente primero)
- `order: 1` (orden manual)

---

### 3. **Education** - Educación
**Propósito**: Formación académica completa

**Campos**:
```javascript
{
  degree: "Computer Engineering",
  institution: "Universidad",
  location: "San José, Costa Rica",
  fieldOfStudy: "Software Engineering",
  startDate: Date,
  endDate: Date,
  graduationYear: "2023",
  gpa: 3.8,
  honors: "Cum Laude",
  description: "Descripción del programa",
  achievements: [
    "Logro académico 1",
    "Logro académico 2"
  ],
  relevantCourses: [
    "Database Management",
    "Software Engineering"
  ],
  order: 1,
  created_at: Date
}
```

---

### 4. **About** - Secciones "Sobre Mí"
**Propósito**: Contenido estructurado para la página About

**Secciones**:
- `intro` - Introducción personal
- `background` - Contexto y experiencia
- `interests` - Intereses técnicos
- `goals` - Objetivos profesionales
- `values` - Valores y principios

**Campos**:
```javascript
{
  section: "intro | background | interests | goals | values",
  title: "Introduction",
  content: "Contenido completo de la sección",
  highlights: [
    "Punto destacado 1",
    "Punto destacado 2"
  ],
  order: 1,
  visible: true,
  created_at: Date,
  updated_at: Date
}
```

---

### 5. **Projects** - Proyectos
**Propósito**: Portfolio de proyectos completados

**Campos**:
```javascript
{
  id: "unique-project-id",
  title: "Inventory Management System",
  description: "Descripción corta",
  longDescription: "Descripción detallada completa",
  technologies: ["C#", "SQL Server", "ASP.NET"],
  image: "/projects/project.jpg",
  images: ["/img1.jpg", "/img2.jpg"],
  githubUrl: "https://github.com/...",
  liveUrl: "https://...",
  category: "Backend | Frontend | Full Stack | Data Analysis",
  featured: true,
  startDate: Date,
  endDate: Date,
  status: "completed | in-progress | planned",
  role: "Full Stack Developer",
  teamSize: 2,
  challenges: [
    "Desafío que enfrentaste"
  ],
  solutions: [
    "Cómo lo resolviste"
  ],
  outcomes: [
    "Resultados obtenidos"
  ],
  order: 1,
  createdAt: Date,
  updatedAt: Date
}
```

**Índices**:
- `featured: 1, order: 1` (proyectos destacados primero)
- `category: 1` (filtrar por categoría)
- `technologies: 1` (búsqueda por tecnología)

---

### 6. **Skills** - Habilidades Técnicas
**Propósito**: Todas tus habilidades técnicas organizadas

**Categorías**:
- Frontend
- Backend
- Database
- DevOps
- Tools
- Languages

**Campos**:
```javascript
{
  id: "csharp",
  name: "C#",
  category: "Languages",
  level: 85,  // 0-100
  yearsOfExperience: 1,
  featured: true,
  description: "Primary programming language",
  projects: ["project-id-1", "project-id-2"],  // Proyectos donde se usó
  order: 1,
  tags: ["backend", "oop", "enterprise"],
  createdAt: Date,
  updatedAt: Date
}
```

**Índices**:
- `category: 1, order: 1` (agrupadas por categoría)
- `featured: 1` (destacadas primero)
- `level: -1` (mayor nivel primero)

---

### 7. **Certifications** - Certificaciones
**Propósito**: Certificaciones profesionales

**Campos**:
```javascript
{
  id: "microsoft-csharp",
  name: "Microsoft Certified: C# Programming",
  issuer: "Microsoft",
  issueDate: "2023-06",
  expiryDate: "2026-06",  // opcional
  credentialId: "ABC123",
  credentialUrl: "https://...",
  description: "Certification description",
  skills: ["C#", ".NET"],
  image: "/certs/cert.jpg",
  featured: true,
  order: 1,
  createdAt: Date,
  updatedAt: Date
}
```

---

### 8. **Contact** - Mensajes de Contacto
**Propósito**: Almacenar todos los mensajes del formulario

**Campos**:
```javascript
{
  name: "Nombre del contacto",
  email: "email@example.com",
  subject: "Asunto del mensaje",
  message: "Contenido del mensaje",
  created_at: Date
}
```

---

## 🔗 API Endpoints Disponibles

### Leer Datos (GET):
- `/api/profile` - Obtener perfil completo
- `/api/experience` - Listar experiencia laboral
- `/api/education` - Listar educación
- `/api/about` - Obtener secciones About
- `/api/projects` - Listar todos los proyectos (ya existe)
- `/api/skills` - Listar habilidades (ya existe)
- `/api/certifications` - Listar certificaciones (ya existe)
- `/api/contact` - Enviar mensaje de contacto (POST)

### Seeding:
- `/api/seed-complete` - Poblar toda la base de datos con tu información

---

## 📝 Cómo Usar la Base de Datos

### 1. **Poblar la Base de Datos**
```bash
# Visita en tu navegador:
http://localhost:3000/api/seed-complete
```

Esto creará todas las colecciones con tu información real.

### 2. **Ver los Datos**
```bash
# Profile
http://localhost:3000/api/profile

# Experience
http://localhost:3000/api/experience

# Education
http://localhost:3000/api/education

# About
http://localhost:3000/api/about
```

### 3. **Modificar Datos**
Puedes modificar los datos directamente en MongoDB Atlas o editando el archivo:
`src/app/api/seed-complete/route.ts`

---

## 🎯 Ventajas de Esta Estructura

### ✅ **Organización**:
- Datos separados por tipo (profile, experience, projects, etc.)
- Fácil de mantener y actualizar
- Estructura clara y lógica

### ✅ **Eficiencia**:
- Índices para búsquedas rápidas
- Campos ordenados (`order`) para control manual
- Queries optimizadas

### ✅ **Escalabilidad**:
- Puedes agregar más experiencias, proyectos, skills
- Fácil agregar nuevos campos sin romper nada
- Schemas flexibles pero validados

### ✅ **Flexibilidad**:
- Campos opcionales donde tiene sentido
- Arrays para listas dinámicas
- Fechas para ordenar cronológicamente

---

## 🔄 Relaciones entre Colecciones

```
Profile (1)
  ↓
  ├─→ Experience (muchos)
  ├─→ Education (muchos)
  ├─→ Projects (muchos)
  ├─→ Skills (muchos)
  └─→ Certifications (muchos)

Projects ←→ Skills (relación a través de arrays)
Skills.projects contiene IDs de proyectos
Projects.technologies contiene nombres de skills
```

---

## 📊 Ejemplo de Consulta

```javascript
// Obtener perfil con estadísticas
const profile = await Profile.findOne();

// Obtener experiencia ordenada por fecha
const experience = await Experience.find()
  .sort({ startDate: -1 })
  .lean();

// Obtener solo proyectos destacados
const featuredProjects = await Project.find({ featured: true })
  .sort({ order: 1 })
  .limit(3);

// Skills por categoría
const backendSkills = await Skill.find({ category: 'Backend' })
  .sort({ level: -1 });
```

---

## 🚀 Próximos Pasos

1. ✅ Modelos creados
2. ✅ Seed script completo
3. ✅ API endpoints
4. ⏳ Actualizar páginas para usar la BD
5. ⏳ Crear panel de administración (opcional)

---

**Última actualización**: ${new Date().toLocaleDateString()}
