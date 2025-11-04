import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, ShieldCheck, Bot, Code2, Server, Laptop } from "lucide-react";

const skillCategories = [
  {
    title: "Networking & Security",
    icon: <Network className="w-8 h-8 text-primary" />,
    skills: ["TCP/IP", "VPN", "VLAN", "OSPF", "ACL", "Firewall", "IDS/IPS", "Kerberos"]
  },
  {
    title: "Cybersecurity Tools",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    skills: ["Wireshark", "Nmap", "Metasploit", "Gobuster", "Zabbix", "Wazuh"]
  },
  {
    title: "Automation",
    icon: <Bot className="w-8 h-8 text-primary" />,
    skills: ["n8n", "Bash", "PowerShell", "NetMiko"]
  },
  {
    title: "Programming",
    icon: <Code2 className="w-8 h-8 text-primary" />,
    skills: ["Python", "JavaScript"]
  },
  {
    title: "Virtualization & Containers",
    icon: <Server className="w-8 h-8 text-primary" />,
    skills: ["Docker", "VMware", "Kubernetes", "Proxmox"]
  },
  {
    title: "Operating Systems",
    icon: <Laptop className="w-8 h-8 text-primary" />,
    skills: ["Linux (Debian, Ubuntu, Kali)", "Windows"]
  }
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-16 animated-gradient-text">Technical Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/20 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="p-3 bg-primary/10 rounded-full">{category.icon}</div>
                <CardTitle className="font-headline text-xl text-foreground">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                     <li key={skillIndex} className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
