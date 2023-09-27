import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'
export default function randomNameGenerator(): string {
    let name = localStorage.getItem("randomName") ?? '';
    if(name == '') { name = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals],separator: ' ' }) }

    localStorage.setItem("randomName", name);
    return name;
}