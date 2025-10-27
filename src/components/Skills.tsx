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
        <h2 className="text-3xl font-headline font-bold text-center mb-12 text-primary">Technical Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="flex flex-row items-center gap-4">
                {category.icon}
                <CardTitle className="font-headline text-xl text-foreground">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
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
