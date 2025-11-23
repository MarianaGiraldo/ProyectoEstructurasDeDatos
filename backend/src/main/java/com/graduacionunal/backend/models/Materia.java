package com.graduacionunal.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Materia") //Nombre de la tabla en la base de datos
public class Materia {

    //Campos de la tabla
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMateria;
    
    @Column(name = "nomMateria", nullable = false, length = 100)
    private String nomMateria;

    @Column(name = "numCreditos", nullable = false)
    private Integer numCreditos;

    //Construtores
    public Materia() {
    }

    public Materia(Integer idMateria, String nomMateria, Integer numCreditos) {
        this.idMateria = idMateria;
        this.nomMateria = nomMateria;
        this.numCreditos = numCreditos;
    }

    //Getters y Setters

    public Integer getIdMateria() {
        return idMateria;
    }

    public void setIdMateria(Integer idMateria) {
        this.idMateria = idMateria;
    }

    public String getNomMateria() {
        return nomMateria;
    }
    public void setNomMateria(String nomMateria) {
        this.nomMateria = nomMateria;
    }

    public Integer getNumCreditos() {
        return numCreditos;
    }

    public void setNumCreditos(Integer numCreditos) {
        this.numCreditos = numCreditos;
    }

}
